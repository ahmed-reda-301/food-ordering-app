/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

/**
 * AddToCartButton Component
 * ------------------------
 * Purpose:
 * - Provides a dialog-based UI for adding a menu item to the shopping cart with custom size and extras.
 * - Integrates with Redux Toolkit for cart state management.
 *
 * Features:
 * - Allows users to select a size and multiple extras for a product.
 * - Dynamically calculates and displays the total price based on selections.
 * - Shows current quantity in cart and enables increment/decrement/removal.
 * - Uses Shadcn UI components for consistent design (Button, Dialog, RadioGroup, Checkbox, etc.).
 * - Handles both adding new items and updating existing ones in the cart.
 * - Fully type-safe with TypeScript and integrates with Prisma types.
 *
 * Usage:
 *   <AddToCartButton item={product} />
 *
 * Best Practices:
 * - Keeps UI logic and cart logic separated: UI state is managed locally, cart state is managed by Redux.
 * - Uses utility functions for quantity and price calculations.
 * - Designed to be reusable for any menu item.
 * - Handles SSR/CSR differences by only using browser APIs in client components.
 *
 * Extensibility:
 * - Can be extended to support more product options, discounts, or validation.
 * - Can be integrated with analytics or user feedback for better UX.
 */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/lib/formatters";
import { Checkbox } from "../ui/checkbox";
import { Extra, ProductSizes, Size } from "@prisma/client";
import { ProductWithRelations } from "@/types/product";
import { CartItem } from "@/redux/features/cart/cartSlice";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addCartItem,
  removeCartItem,
  removeItemFromCart,
  selectCartItems,
} from "@/redux/features/cart/cartSlice";
import { getItemQuantity } from "@/lib/cart";

function AddToCartButton({ item }: { item: ProductWithRelations }) {
  //   const sizes = [
  //     { id: crypto.randomUUID(), name: "Small", price: 0 },
  //     { id: crypto.randomUUID(), name: "Medium", price: 2 },
  //     { id: crypto.randomUUID(), name: "Large", price: 4 },
  //   ];
  //   const extras = [
  //     { id: crypto.randomUUID(), name: "Cheese", price: 2 },
  //     { id: crypto.randomUUID(), name: "Tomato", price: 4 },
  //     { id: crypto.randomUUID(), name: "Onion", price: 6 },
  //   ];
    const cart = useAppSelector(selectCartItems);
  const quantity = getItemQuantity(item.id, cart);


  const defaultSize =
    cart.find((element) => element.id === item.id)?.size ||
    item.sizes.find((size) => size.name === ProductSizes.SMALL);
  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!);
  const defaultExtras =
    cart.find((element) => element.id === item.id)?.extras || [];
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtras);

  let totalPrice = item.basePrice;
  if (selectedSize) {
    totalPrice += selectedSize.price;
  }
  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price;
    }
  }
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addCartItem({
        basePrice: item.basePrice,
        id: item.id,
        image: item.imageUrl,
        name: item.name,
        size: selectedSize,
        extras: selectedExtras,
      })
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="lg"
          className="mt-4 text-white rounded-full !px-8"
        >
          <span>Add To Cart</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex items-center">
          <Image src={item.imageUrl} alt={item.name} width={200} height={200} />
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription className="text-center">
            {item.description}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-10">
          <div className="space-y-4 text-center">
            <Label htmlFor="pick-size">Pick your size</Label>
            <PickSize
              sizes={item.sizes}
              item={item}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </div>
          <div className="space-y-4 text-center">
            <Label htmlFor="add-extras">Any extras?</Label>

            <Extras
              extras={item.extras}
              selectedExtras={selectedExtras}
              setSelectedExtras={setSelectedExtras}
            />
          </div>
        </div>
        <DialogFooter>
          {quantity === 0 ? (
            <Button
              type="submit"
              onClick={handleAddToCart}
              className="w-full h-10"
            >
              Add to cart {formatCurrency(totalPrice)}
            </Button>
          ) : (
            <ChooseQuantity
              quantity={quantity}
              item={item}
              selectedSize={selectedSize}
              selectedExtras={selectedExtras}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddToCartButton;

function PickSize({
  sizes,
  item,
  selectedSize,
  setSelectedSize,
}: {
  sizes: Size[];
  selectedSize: Size;
  setSelectedSize: React.Dispatch<React.SetStateAction<Size>>;
  item: ProductWithRelations;
}) {
  return (
    <RadioGroup defaultValue="comfortable">
      {sizes.map((size) => (
        <div
          key={size.id}
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
        >
          <RadioGroupItem
            value={selectedSize.name}
            checked={selectedSize.id === size.id}
            id={size.id}
            onClick={() => setSelectedSize(size)}
          />
          <Label htmlFor={size.id}>
            {size.name} {formatCurrency(size.price + item.basePrice)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
function Extras({
  extras,
  selectedExtras,
  setSelectedExtras,
}: {
  extras: Extra[];
  selectedExtras: Extra[];
  setSelectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>;
}) {
  const handleExtra = (extra: Extra) => {
    if (selectedExtras.find((e) => e.id === extra.id)) {
      const filteredSelectedExtras = selectedExtras.filter(
        (item) => item.id !== extra.id
      );
      setSelectedExtras(filteredSelectedExtras);
    } else {
      setSelectedExtras((prev) => [...prev, extra]);
    }
  };
  return extras.map((extra) => (
    <div
      key={extra.id}
      className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
    >
      <Checkbox
        id={extra.id}
        onClick={() => handleExtra(extra)}
        checked={Boolean(selectedExtras.find((e) => e.id === extra.id))}
      />
      <Label
        htmlFor={extra.id}
        className="text-sm text-accent font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {extra.name} {formatCurrency(extra.price)}
      </Label>
    </div>
  ));
}

const ChooseQuantity = ({
  quantity,
  item,
  selectedExtras,
  selectedSize,
}: {
  quantity: number;
  selectedExtras: Extra[];
  selectedSize: Size;
  item: ProductWithRelations;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center flex-col gap-2 mt-4 w-full">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => dispatch(removeCartItem({ id: item.id }))}
        >
          -
        </Button>
        <div>
          <span className="text-black">{quantity} in cart</span>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            dispatch(
              addCartItem({
                basePrice: item.basePrice,
                id: item.id,
                image: item.imageUrl,
                name: item.name,
                extras: selectedExtras,
                size: selectedSize,
              })
            )
          }
        >
          +
        </Button>
      </div>
      <Button
        size="sm"
        onClick={() => dispatch(removeItemFromCart({ id: item.id }))}
      >
        Remove
      </Button>
    </div>
  );
};
