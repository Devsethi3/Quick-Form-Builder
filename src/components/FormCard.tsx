"use client"
import React, { useState } from "react";
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

const FormCard = ({ form }: { form: Form }) => {
    const [showMenu, setShowMenu] = useState(false);

    const handleDelete = async () => {
        try {
            console.log("form deleted", form.id);

            // await deleteForm(form.id);
            // Optionally, you can update the UI to reflect the deletion
        } catch (error) {
            // Handle error
            console.error("Error deleting form:", error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-between relative">
                    <span className="truncate font-bold">{form.name}</span>
                    {form.published && <Badge>Published</Badge>}
                    {!form.published && <Badge variant={"destructive"}>Draft</Badge>}
                    <div className="">
                        <Button variant="secondary" className="rounded-full" size="icon" onClick={() => setShowMenu(!showMenu)}>
                            <PiDotsThreeOutlineVerticalFill />
                        </Button>
                        {showMenu && (
                            <div className="absolute p-2 shadow-md bg-white">
                                <button className="text-sm text-muted-foreground hover:text-accent" onClick={handleDelete}>
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
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
