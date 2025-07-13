/**
 * DeleteCategory Component
 * ------------------------
 * Renders a button to delete a category in the admin dashboard.
 * - Handles deletion logic and displays loading state and messages.
 * - Calls the deleteCategory server action and updates UI accordingly.
 *
 * Props:
 *   - id: The ID of the category to delete.
 *
 * Usage:
 *   <DeleteCategory id={category.id} />
 *
 * Best Practices:
 *   - Confirm deletion with the user before proceeding (add a dialog if needed).
 *   - Handle errors gracefully and provide feedback to the user.
 */

"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteCategory } from "../_actions/category";

type StateType = {
  isLoading: boolean;
  message: string;
  status: number | null;
};

function DeleteCategory({ id }: { id: string }) {
  const [state, setState] = useState<StateType>({
    isLoading: false,
    message: "",
    status: null,
  });

  const handleDelete = async () => {
    try {
      setState((prev) => {
        return { ...prev, isLoading: true };
      });
      const res = await deleteCategory(id);
      setState((prev) => {
        return { ...prev, message: res.message, status: res.status };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setState((prev) => {
        return { ...prev, isLoading: false };
      });
    }
  };
  return (
    <Button
      variant="secondary"
      disabled={state.isLoading}
      onClick={handleDelete}
    >
      <Trash2 />
    </Button>
  );
}

export default DeleteCategory;
