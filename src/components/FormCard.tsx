"use client"
import { FaEdit, FaWpforms } from "react-icons/fa";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { LuView } from "react-icons/lu";
import { Button } from "./ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { formatDistance } from "date-fns";
import { Form } from "@prisma/client";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useTransition } from "react";
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
    AlertDialogTrigger,
} from "./ui/alert-dialog";
import { toast } from "./ui/use-toast";
import { DeleteForm } from "@/action/form";

const FormCard = ({ form }: { form: Form }) => {

    const [loading, startTransition] = useTransition();

    const handleDelete = async () => {
        try {
            console.log("Form deleted", form.id);

            const deleted = await DeleteForm(form.id);

            if (deleted) {
                toast({
                    title: "Form Deleted!",
                    description: "Your form has been deleted successfully!",
                    duration: 2500,
                });
            }
        } catch (error: any) {
            // Handle error
            console.error("Error deleting form:", error);

            if (error.message === "Form not found") {
                toast({
                    title: "Error",
                    description: "The form you're trying to delete does not exist.",
                    duration: 2500,
                });
            } else {
                toast({
                    title: "Error",
                    description: "Failed to delete form. Please try again later.",
                    duration: 2500,
                });
            }
        }
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-between relative">
                    <h2 className="font-bold text-[1.4rem]">{form.name}</h2>
                    {form.published && <Badge>Published</Badge>}
                    {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="ghost" className="rounded-full">
                                        <PiDotsThreeOutlineVerticalFill className="w-4 h-4" />
                                        <span className="sr-only">Actions</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem className="cursor-pointer">
                                        <RiDeleteBin5Line className="mr-2" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. After deleting the form, you will not be able to retrieve it. <br />
                                    <br />
                                    <span className="font-medium">
                                        By deleting this form, all associated data will be permanently removed from your account.
                                    </span>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500 text-white hover:bg-red-600"
                                    disabled={loading}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        startTransition(handleDelete);
                                    }}
                                >
                                    <p className="flex items-center gap-2" onClick={handleDelete}> <RiDeleteBin5Line />Delete {loading && <FaSpinner className="animate-spin" />}</p>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardTitle>
                <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
                    {formatDistance(form.createdAt, new Date(), {
                        addSuffix: true,
                    })}
                    {form.published && (
                        <span className="flex items-center gap-2">
                            <LuView className="text-muted-foreground" />
                            <span>{form.visits.toLocaleString()}</span>
                            <FaWpforms className="text-muted-foreground" />
                            <span>{form.submissions.toLocaleString()}</span>
                        </span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
                {form.description || "No description"}
            </CardContent>
            <CardFooter>
                {form.published && (
                    <Button asChild className="w-full mt-2 text-md gap-4">
                        <Link href={`/forms/${form.id}`}>
                            View submissions <BiRightArrowAlt />
                        </Link>
                    </Button>
                )}
                {!form.published && (
                    <Button asChild variant={"secondary"} className="w-full mt-2 text-md gap-4">
                        <Link href={`/builder/${form.id}`}>
                            Edit form <FaEdit />
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default FormCard;


{/* <DropdownMenu>
<DropdownMenuTrigger asChild>
    <Button size="icon" variant="ghost" className="rounded-full">
        <PiDotsThreeOutlineVerticalFill className="w-4 h-4" />
        <span className="sr-only">Actions</span>
    </Button>
</DropdownMenuTrigger>
<DropdownMenuContent align="end">
    <DropdownMenuItem className="cursor-pointer" onClick={handleDelete}>
        <RiDeleteBin5Line className="mr-2" />
        Delete
    </DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu> */}