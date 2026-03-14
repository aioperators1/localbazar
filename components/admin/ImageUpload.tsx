"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    value: string[];
    onChange: (urls: string[]) => void;
    onRemove: (url: string) => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
    const onUpload = (result: any) => {
        onChange([...value, result.info.secure_url]);
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {value.map((url, idx) => (
                    <div key={url} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between px-1">
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#919191]">
                                {idx === 0 ? "1. Primary Image (Cover)" : idx === 1 ? "2. Hover Flip Image (Secondary)" : `${idx + 1}. Gallery Image`}
                            </span>
                        </div>
                        <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-[#E3E3E3] bg-[#F9F9F9] group">
                            <Image 
                                fill 
                                src={url} 
                                alt="Product" 
                                className="object-cover"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button 
                                    type="button" 
                                    variant="destructive" 
                                    size="icon" 
                                    onClick={() => onRemove(url)}
                                    className="h-12 w-12 rounded-full shadow-2xl"
                                >
                                    <Trash2 className="w-6 h-6" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Upload Trigger */}
                {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? (
                    <CldUploadWidget 
                        onSuccess={onUpload} 
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "localbazar"}
                    >
                        {({ open }) => {
                            const onClick = () => {
                                open();
                            };

                            return (
                                <div className="flex flex-col gap-2 h-full">
                                    <div className="flex items-center justify-between px-1 invisible">
                                        <span className="text-[9px] font-black uppercase">Placeholder</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={onClick}
                                        className="flex flex-col items-center justify-center gap-4 aspect-[3/4] border-2 border-dashed border-[#D2D2D2] hover:border-[#303030] hover:bg-[#F9F9F9] rounded-xl bg-white transition-all duration-500 group"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                            <ImagePlus className="w-8 h-8 text-[#616161]" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[12px] font-black uppercase tracking-widest text-[#303030]">Upload Image</p>
                                            <p className="text-[10px] font-bold text-[#919191] mt-1">PNG, JPG or WebP</p>
                                        </div>
                                    </button>
                                </div>
                            );
                        }}
                    </CldUploadWidget>
                ) : (
                    <div className="flex flex-col gap-2 h-full opacity-60">
                        <div className="flex items-center justify-between px-1 invisible">
                            <span className="text-[9px] font-black uppercase">Placeholder</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 aspect-[3/4] border-2 border-dashed border-[#D2D2D2] rounded-xl bg-[#F9F9F9]">
                            <ImageIcon className="w-8 h-8 text-[#919191]" />
                            <p className="text-[10px] font-bold text-[#919191] uppercase tracking-widest text-center px-4">Cloudinary Not Configured</p>
                        </div>
                    </div>
                )}
            </div>
            
            {!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-[11px] font-bold text-amber-700 leading-relaxed uppercase tracking-tight">
                        ⚠️ Cloudinary not configured. Please add <code className="bg-amber-100 px-1">NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> to your .env file to enable uploads.
                    </p>
                </div>
            )}
        </div>
    );
}
