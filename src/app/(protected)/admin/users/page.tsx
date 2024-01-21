"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Pagination,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import { columns } from "./column";
import { EditIcon } from "@nextui-org/shared-icons";

export default function App() {
  const [users, setUsers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const statusColorMap: Record<string, ChipProps["color"]> = {
    true: "success",
    false: "danger",
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (page == 1 || page == 0) {
          const response = await fetch("/api/users?page=0");
          const data = await response.json();
          setUsers(data.users);
        } else {
          const skip = page - 1 + "0";
          const response = await fetch("/api/users?page=" + skip);
          const data = await response.json();
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        if (!isLoaded) {
          setTimeout(() => {
            setIsLoaded(!isLoaded);
          }, 1000);
        }
      }
    };

    fetchUsers();
  }, [page]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseAllUsers = await fetch("/api/users");
        const allData = await responseAllUsers.json();
        setAllUsers(allData.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setTimeout(() => {
          setIsLoaded(!isLoaded);
        }, 1000);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId: string) => {
    try {
      await fetch("/api/users/delete?id=" + userId, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const renderCell = useCallback((user: any, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof typeof user];
    let verified: string;
    if (user.emailVerified) {
      verified = "Bestätigt";
    } else {
      verified = "Nicht bestätigt";
    }

    switch (columnKey) {
      case "email":
        return (
          <User
            name={user.name}
            description={user.email}
            avatarProps={{
              src: user.image,
            }}
          >
            {user.email}
          </User>
        );
      case "username":
      case "role":
        return <p className="text-bold text-sm">{cellValue}</p>;
      case "emailVerified":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.emailVerified]}
            size="sm"
            variant="flat"
          >
            {verified}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Link href={`/admin/user?id=${user.id}`}>
              <Button
                href={`/admin/user?id=${user.id}`}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon color="primary" />
              </Button>
            </Link>
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="faded" aria-label="Static Actions">
                <DropdownItem key="new">{`Do you want to delete ${user.email}?`}</DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete user
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  // @ts-ignore
  const pages = Math.ceil(allUsers / rowsPerPage);

  return (
    <>
      <Skeleton isLoaded={isLoaded}>
        <Table
          isStriped
          aria-label="Example table with custom cells"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(newPage) => setPage(newPage)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
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
      </Skeleton>
    </>
  );
}
