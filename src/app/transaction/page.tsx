'use client'

import { useState } from 'react';

import { InformationCircleIcon } from "@heroicons/react/solid";
import {
  BadgeDelta,
  DeltaType,
  Flex,
  Icon,
  MultiSelect,
  MultiSelectItem,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title
} from "@tremor/react";
import styles from './page.module.scss';
export type SalesPerson = {
  date:string;
  name: string;
  trade: string;
  buy: number;
  sale: number;
  upside: number;
  status: string;
};

const salesPeople: SalesPerson[] = [
  {
    date: "20 JAN 2024",
    name: 'Akash',
    trade: 'HDFC Securities',
    buy: 1475.10,
    sale: 1400.00,
    upside: -5.09,
    status: "Gold",
  },
  {
    date: "19 JAN 2024",
    name: 'Lokesh',
    trade: 'Axis Direct',
    buy: 2713.30,
    sale: 2740.00	,
    upside: 0.98,
    status: "Gold",
  },
  {
    date: "18 JAN 2024",
    name: 'Biraj',
    trade: 'Edelweiss',
    buy: 1478.85,
    sale: 1800.00,
    upside: 21.72,
    status: "Gold",
  },
  {
    date: "17 JAN 2024",
    name: 'Vishal',
    trade: 'Ashika Research',
    buy: 3246.20,
    sale: 3510.00	,
    upside: 8.13,
    status: "Gold",
  },
  {
    date: "16 JAN 2024",
    name: 'Gaurav',
    trade: 'IDBI Capital',
    buy: 2801.45,
    sale: 3230.00	,
    upside: 15.30,
    status: "Gold",
  },
];

const deltaTypes: { [key: string]: DeltaType } = {
  Silver: "moderateIncrease",
  Gold: "moderateIncrease",
  Bronze: "moderateIncrease",
};

export default function Transaction() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const isSalesPersonSelected = (salesPerson: SalesPerson) =>
    (salesPerson.status === selectedStatus || selectedStatus === "all") &&
    (selectedNames.includes(salesPerson.name) || selectedNames.length === 0);
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div>
        <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
          <Title className={styles.title}> Performance History </Title>
          <Icon
            icon={InformationCircleIcon}
            variant="simple"
            tooltip="Shows sales performance per employee"
          />
        </Flex>
      </div>
      <div className="flex space-x-2">
        <MultiSelect
          className="max-w-full sm:max-w-xs"
          onValueChange={setSelectedNames}
          placeholder="Select User..."
        >
          {salesPeople.map((item) => (
            <MultiSelectItem key={item.name} value={item.name}>
              {item.name}
            </MultiSelectItem>
          ))}
        </MultiSelect>
        <Select
          className="max-w-full sm:max-w-xs"
          defaultValue="all"
          onValueChange={setSelectedStatus}
        >
          <SelectItem value="all">All Performances</SelectItem>
          <SelectItem value="Gold">Gold</SelectItem>
          <SelectItem value="Silver">Silver</SelectItem>
          <SelectItem value="Bronze">Bronze</SelectItem>
        </Select>
      </div>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell className="text-right">Name</TableHeaderCell>
            <TableHeaderCell className="text-right">Trade</TableHeaderCell>
            <TableHeaderCell className="text-right">Buy (₹)</TableHeaderCell>
            <TableHeaderCell className="text-right">Sale (₹)</TableHeaderCell>
            <TableHeaderCell className="text-right">Upside (%)</TableHeaderCell>
            <TableHeaderCell className="text-right">Status</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {salesPeople
            .filter((item) => isSalesPersonSelected(item))
            .map((item) => (
              <TableRow key={item.date}>
                <TableCell style={{cursor:'pointer'}}>{item.date}</TableCell>
                <TableCell className="text-right">{item.name}</TableCell>
                <TableCell className="text-right">{item.trade}</TableCell>
                <TableCell className="text-right">{item.buy}</TableCell>
                <TableCell className="text-right">{item.sale}</TableCell>
                <TableCell className="text-right">{item.upside}</TableCell>
                <TableCell className="text-right" >
                  <BadgeDelta style={{cursor:'pointer'}} deltaType={deltaTypes[item.status]} size="xs">
                    {item.status}
                  </BadgeDelta>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      </div>
    </div>
  )
}
