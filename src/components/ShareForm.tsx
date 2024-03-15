"use client"
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImShare } from "react-icons/im";
import { toast } from "./ui/use-toast";
import { FaCheck } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";

function ShareForm({ shareUrl }: { shareUrl: string }) {
    const [mounted, setMounted] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const shareLink = `${window.location.origin}/submit/${shareUrl}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareLink);
        setIsCopied(true);
        toast({
            title: "Copied!",
            description: "Link copied to clipboard",
        });
        setTimeout(() => setIsCopied(false), 1500);
    };

    const handleShare = async () => {
        await navigator.share({
            title: document.title,
            url: shareLink,
        });
    };

    return (
        <div className="flex flex-col md:flex-row flex-grow gap-4 items-center">
            <div className="flex items-center gap-3 w-full">
                <Input value={shareLink} readOnly />
                <Button onClick={handleCopy} variant="ghost">
                    {isCopied ? <FaCheck className="text-green-600 text-xl" /> : <LuCopy className="text-xl" />}
                </Button>
            </div>
            <Button className="w-[250px]" onClick={handleShare}>
                <ImShare className="mr-2 h-4 w-4" />
                Share link
            </Button>
        </div>
    );
}

export default ShareForm;
