"use client";

import { Button } from "@components/button";
import { Input } from "@components/input";
import Iconify from "@components/Iconify";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/table";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { Fragment, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import toast, { Toaster } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

type NotificationType = {
    id: string;
    title: string;
    content: string;
    announcement: any;
    setAnnouncement: any;
    is_pinned: any;
    created_at: any;
};
interface iProps {
    title: string;
    content: string;
    id: string;
    announcement: any;
    setAnnouncement: any;
    is_pinned: any;
    created_at: any;
    // setLoad: any;
    // load:boolean;
}

export default function AnnouncementComp({
    title,
    content,
    id,
    announcement,
    setAnnouncement,
    is_pinned,
    created_at,
} // setLoad,
    // load,
    : iProps) {
    let [isOpen, setIsOpen] = useState(false);
    let [isConfirmDelete, setIsConfirmDelete] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies();

    const handleDeleteAnnouncement = async () => {
        try {
            const response = await fetch(
                `${process.env.SERVER}/announcement/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: cookies.token,
                    },
                },
            );

            if (!response.ok) {
                console.error(
                    "Error fetching announcement:",
                    "Network response was not ok",
                );
            }
            setIsConfirmDelete(false);
            console.log("masuk delete 1");

            setAnnouncement({
                pinned: announcement.pinned.filter((ctx: any) => ctx.id !== id),
                unpinned: announcement.unpinned.filter((ctx: any) => ctx.id !== id),
                announcements: announcement.announcements.filter(
                    (ctx: any) => ctx.id !== id,
                ),
            });
        } catch (error) {
            console.error("Error fetching announcement:", error);
        }
    };
    const handlePinAnnouncement = async () => {
        try {
            const response = await fetch(
                `${process.env.SERVER}/announcement/pin/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: cookies.token,
                    },
                },
            );

            if (!response.ok) {
                console.error("Error pin announcement:", "Network response was not ok");
            }

            // setLoad(!load);

            announcement.announcements.map((ctx: any) => {
                if (ctx.id === id && ctx.is_pinned === 1) {
                    ctx.is_pinned = 0;
                    setAnnouncement({
                        ...announcement,
                        unpinned: [...announcement.unpinned, ctx],
                        pinned: announcement.pinned.filter((ctx: any) => {
                            return ctx.id !== id;
                        }),
                    });
                } else if (ctx.id === id && ctx.is_pinned === 0) {
                    ctx.is_pinned = 1;
                    setAnnouncement({
                        ...announcement,
                        pinned: [...announcement.pinned, ctx],
                        unpinned: announcement.unpinned.filter((ctx: any) => {
                            return ctx.id !== id;
                        }),
                    });
                }
            });
        } catch (error) {
            console.error("Error fetching announcement:", error);
        }
    };

}

