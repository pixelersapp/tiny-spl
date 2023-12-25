import { useParams } from "react-router-dom";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TinySplRow } from "../../swr-hooks/types/TinySplRow";
import {
  Anchor,
  Avatar,
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
  WindowContent,
} from "react95";
import { truncatePublicKey } from "@/app/common/utils/truncatePublicKey";
import { useTinySplsByOwner } from "../../swr-hooks/hooks/useTinySplsByOwner";
import { useMemo, useState } from "react";
import { Loader } from "@/app/common/components/Loader";
import Decimal from "decimal.js";
import { ChevronLeft } from "@/app/common/icons/ChevronLeft";

const columns: ColumnDef<TinySplRow>[] = [
  {
    id: "logo",
    columns: [
      {
        header: "Logo",
        accessorKey: "logo",
        cell: (info) => (
          <div className="flex justify-center">
            <Avatar square size={50} src={info.getValue()} />
          </div>
        ),
        enableSorting: false,
      },
    ],
  },
  {
    id: "name",
    columns: [
      {
        header: "Name",
        accessorKey: "collectionName",
        cell: (info) => {
          const collectionName = info.getValue();
          const collectionId = info.row.original.collectionId;

          return (
            <div>
              <div>{collectionName ?? ""}</div>
              <Anchor
                className="!text-sm"
                href={`https://xray.helius.xyz/token/${collectionId}?network=mainnet`}
                target="_blank"
              >
                {truncatePublicKey(collectionId, 8)}
              </Anchor>
            </div>
          );
        },
        sortingFn: (a, b) =>
          (a.original.collectionName ?? "").localeCompare(
            b.original.collectionName ?? ""
          ),
      },
    ],
  },
  {
    id: "amount",
    columns: [
      {
        header: "Amount",
        accessorKey: "amount",
        cell: (info) => {
          const amount = info.getValue();
          const symbol = info.row.original.symbol;

          return (
            <div>
              {amount} {symbol}
            </div>
          );
        },
        sortingFn: (a, b) =>
          new Decimal(a.original.amount).cmp(b.original.amount),
      },
    ],
  },
];

export const TinySplList = () => {
  const { publicKey } = useParams<{ publicKey: string }>();

  const { data } = useTinySplsByOwner(publicKey);

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const tableHeaders = table.getHeaderGroups().at(-1);
  const tableHead = !tableHeaders ? null : (
    <TableHead>
      <TableRow>
        {tableHeaders.headers.map((header) => {
          return (
            <TableHeadCell
              key={header.id}
              disabled={!header.column.getCanSort()}
              onClick={header.column.getToggleSortingHandler()}
            >
              <div className="flex justify-between items-center">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {{
                  asc: <ChevronLeft width={24} className="rotate-90" />,
                  desc: <ChevronLeft width={24} className="-rotate-90" />,
                }[header.column.getIsSorted() as string] ?? null}
              </div>
            </TableHeadCell>
          );
        })}
      </TableRow>
    </TableHead>
  );

  if (!data) {
    return (
      <>
        <Table>{tableHead}</Table>
        <WindowContent>
          <Loader />
        </WindowContent>
      </>
    );
  }

  return (
    <Table>
      {tableHead}
      <TableBody>
        {table
          .getRowModel()
          .rows.slice(0, 10)
          .map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableDataCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableDataCell>
                  );
                })}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
};