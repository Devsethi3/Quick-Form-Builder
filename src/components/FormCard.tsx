"use client";
import { FaEdit, FaWpforms } from "react-icons/fa";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { LuView } from "react-icons/lu";
import { Button } from "./ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { formatDistance } from "date-fns";
import { Form } from "@prisma/client";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useTransition, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { toast } from "./ui/use-toast";
import { DeleteForm } from "@/action/form";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

const FormCard = ({ form }: { form: Form }) => {
  const [loading, startTransition] = useTransition();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const deleted = await DeleteForm(form.id);

      if (deleted) {
        toast({
          title: "Form Deleted!",
          description: "Your form has been deleted successfully!",
          duration: 2500,
        });
        setIsDeleteDialogOpen(false);
      }
    } catch (error: any) {
      console.error("Error deleting form:", error);

      toast({
        title: "Error",
        description:
          error.message === "Form not found"
            ? "The form you're trying to delete does not exist."
            : "Failed to delete form. Please try again later.",
        variant: "destructive",
        duration: 2500,
      });
    }
  };

  return (
    <>
      <Card className="group relative min-h-[220px] flex flex-col overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="flex items-center gap-3 mb-2">
                <h2 className="font-semibold truncate text-lg lg:text-xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent dark:from-foreground dark:to-foreground/50">
                  {form.name}
                </h2>
              </CardTitle>

              <div className="flex items-center gap-2 flex-wrap">
                {form.published ? (
                  <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                    Published
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 hover:bg-amber-500/20"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" />
                    Draft
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions dropdown - visible on mobile, hover on desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity focus:opacity-100"
                >
                  <PiDotsThreeOutlineVerticalFill className="w-4 h-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <RiDeleteBin5Line className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <CardDescription className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground/70">
              {formatDistance(form.createdAt, new Date(), {
                addSuffix: true,
              })}
            </span>

            {form.published && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10">
                    <LuView className="w-3 h-3 text-blue-500" />
                  </div>
                  <span className="font-medium">
                    {form.visits.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/10">
                    <FaWpforms className="w-3 h-3 text-purple-500" />
                  </div>
                  <span className="font-medium">
                    {form.submissions.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 py-2">
          <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
            {form.description || "No description provided"}
          </p>
        </CardContent>

        <CardFooter className="pt-2 pb-4">
          {form.published ? (
            <Button
              asChild
              className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 group/btn"
            >
              <Link href={`/forms/${form.id}`}>
                View submissions
                <BiRightArrowAlt className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          ) : (
            <Button
              asChild
              variant="secondary"
              className="w-full gap-2 hover:bg-secondary/80 transition-all duration-300 group/btn"
            >
              <Link href={`/builder/${form.id}`}>
                Edit form
                <FaEdit className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Delete Alert Dialog - Separated for better UX */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center bg-red-300 mb-4">
              <TriangleAlert className="w-6 h-6 text-red-600" />
            </div>
            <AlertDialogTitle className="text-center">
              Delete &quot;{form.name}&quot;?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              This action cannot be undone. This will permanently delete your
              form and all associated submissions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-2 mt-4">
            <AlertDialogCancel className="sm:w-32">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="sm:w-32"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                startTransition(handleDelete);
              }}
            >
              {loading ? (
                <FaSpinner className="w-4 h-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FormCard;
