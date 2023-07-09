"use client";

import {DialogTitle, Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";

interface ModalProps{
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
    description,
    isOpen,
    onClose,
    title,
    children
}) => {
    const onChnage = (open:boolean) =>{
        if(!open){
            onClose();
        }
    };

    return(
        <Dialog open={isOpen} onOpenChange={onChnage}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}