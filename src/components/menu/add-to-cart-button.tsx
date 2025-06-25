/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

/**
 * AddToCartButton Component
 * ------------------------
 * Purpose:
 * - Provides a button to add a menu item to the shopping cart.
 * - Handles click events to trigger cart state updates (e.g., via Redux or context).
 *
 * Features:
 * - Receives item/product ID as a prop.
 * - Can show loading or success state after click.
 * - Styled with Shadcn UI button variants for consistency.
 *
 * Usage:
 * <AddToCartButton productId={item.id} />
 *
 * Example:
 * <MenuItem ...>
 *   <AddToCartButton productId={item.id} />
 * </MenuItem>
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AddToCartButton({ item }: { item: any }) {
  const sizes = [
    { id: crypto.randomUUID(), name: "Small", price: 0 },
    { id: crypto.randomUUID(), name: "Medium", price: 2 },
    { id: crypto.randomUUID(), name: "Large", price: 4 },
  ];
  const extras = [
    { id: crypto.randomUUID(), name: "Cheese", price: 2 },
    { id: crypto.randomUUID(), name: "Tomato", price: 4 },
    { id: crypto.randomUUID(), name: "Onion", price: 6 },
  ];

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
            <PickSize sizes={sizes} item={item} />
          </div>
          <div className="space-y-4 text-center">
            <Label htmlFor="add-extras">Any extras?</Label>
            <Extras extras={extras} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full h-10">
            Add to cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddToCartButton;

function PickSize({ sizes, item }: { sizes: any; item: any }) {
  return (
    <RadioGroup defaultValue="comfortable">
      {sizes.map((size) => (
        <div
          key={size.id}
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
        >
          <RadioGroupItem value={size.name} id={size.id} />
          <Label htmlFor={size.id}>
            {size.name} {formatCurrency(size.price + item.basePrice)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
function Extras({ extras }: { extras: any }) {
  return extras.map((extra) => (
    <div
      key={extra.id}
      className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
    >
      <Checkbox id={extra.id} />
      <Label
        htmlFor={extra.id}
        className="text-sm text-accent font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {extra.name} {formatCurrency(extra.price)}
      </Label>
    </div>
  ));
}
