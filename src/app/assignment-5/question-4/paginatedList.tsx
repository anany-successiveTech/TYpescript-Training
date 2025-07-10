"use client";

import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// ✅ Export Post interface for use elsewhere
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PaginatedListProps {
  itemsPerPage: number;
  initialData?: Post[];
}

export default function PaginatedList({ itemsPerPage, initialData = [] }: PaginatedListProps) {
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<Post[]>(initialData);
  const [totalCount, setTotalCount] = useState<number>(initialData.length || 0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${
          (pageNum - 1) * itemsPerPage
        }&_limit=${itemsPerPage}`
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const data: Post[] = await res.json();

      setTotalCount(100); // Static count for JSONPlaceholder
      setItems(data);
    } catch (err: any) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialData.length === 0 || page !== 1) {
      fetchPage(page);
    } else {
      // Set from initialData only once on first load
      setItems(initialData.slice(0, itemsPerPage));
      setTotalCount(100); // still using fixed total
    }
  }, [page, itemsPerPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div>
      <h1>Paginated List (Page {page})</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <br />
            {item.body}
          </li>
        ))}
      </ul>

      <Stack spacing={2} alignItems="center" marginTop="1rem">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, val) => setPage(val)}
          shape="rounded"
        />
      </Stack>
    </div>
  );
}
