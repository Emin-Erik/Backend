"use client";
import React, {useEffect, useState} from "react";
import {
    Button,
    Link,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import {DeleteIcon} from "./DeleteIcon";
import {columns} from "./column";
import {EditIcon} from "@nextui-org/shared-icons";

export default function App() {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const toggleLoad = () => {
        setIsLoaded(!isLoaded);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("/api/users");
            const data = await response.json();
            setUsers(data.users); // Access the 'users' property in the response
        };

        fetchUsers();
        setTimeout(function () {
            toggleLoad();
        }, 1000);
    }, []);

    const deleteUser = async (userId: string) => {
        try {
            await fetch("/api/users/delete?id=" + userId, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
            });
        } catch (error) {
            console.log("error", error);
        }
        const fetchUsers = async () => {
            const response = await fetch("/api/users");
            const data = await response.json();
            setUsers(data.users); // Access the 'users' property in the response
        };

        fetchUsers();
    };

    type User = (typeof users)[0];
    const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof User];

        switch (columnKey) {
            case "id":
                return <p className="text-bold text-sm">{cellValue}</p>;
            case "email":
                return <p className="text-bold text-sm">{cellValue}</p>;
            case "username":
                return <p className="text-bold text-sm">{cellValue}</p>;
            case "role":
                return <p className="text-bold text-sm">{cellValue}</p>;
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Button
                            onClick={() => deleteUser(user.id)}
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                        >
                            <DeleteIcon/>
                        </Button>
                        <Button
                            className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <Link href={"/admin/user?id=" + (user.id)}>
                                <EditIcon/>
                            </Link>
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (

        <>
            <Skeleton isLoaded={isLoaded}>
                <Table isStriped aria-label="Example table with custom cells">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={column.uid === "actions" ? "center" : "start"}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={users}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => (
                                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Skeleton></>

    );
}
