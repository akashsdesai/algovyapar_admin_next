'use client'

import { HomeIcon, IdentificationIcon, InformationCircleIcon, PhoneIcon, UserAddIcon } from "@heroicons/react/solid";
import {
  BadgeDelta,
  Button,
  DeltaType,
  Flex,
  Icon,
  MultiSelect,
  MultiSelectItem,
  NumberInput,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TextInput,
  Title
} from "@tremor/react";
import { useState } from "react";
import styles from './page.module.scss';
export type SalesPerson = {
  name: string;
  leads: number;
  sales: string;
  quota: string;
  variance: string;
  region: string;
  status: string;
};

const salesPeople: SalesPerson[] = [
  {
    name: "Peter Doe",
    leads: 45,
    sales: "1,000,000",
    quota: "1,200,000",
    variance: "low",
    region: "Region A",
    status: "Gold",
  },
  {
    name: "Lena Whitehouse",
    leads: 35,
    sales: "900,000",
    quota: "1,000,000",
    variance: "low",
    region: "Region B",
    status: "Silver",
  },
  {
    name: "Phil Less",
    leads: 52,
    sales: "930,000",
    quota: "1,000,000",
    variance: "medium",
    region: "Region C",
    status: "Bronze",
  },
  {
    name: "John Camper",
    leads: 22,
    sales: "390,000",
    quota: "250,000",
    variance: "low",
    region: "Region A",
    status: "Gold",
  },
  {
    name: "Max Balmoore",
    leads: 49,
    sales: "860,000",
    quota: "750,000",
    variance: "low",
    region: "Region B",
    status: "Gold",
  },
];

const deltaTypes: { [key: string]: DeltaType } = {
  Silver: "moderateIncrease",
  Gold: "moderateIncrease",
  Bronze: "moderateIncrease",
};

export default function Account() {

  const [addUser, setAddUser]=useState(false);
  const [selectUser, setSelectUser]=useState(false);
  const [updateUser, setUpdateUser]=useState(false);
  const [useDetails, setUserDetails]=useState({
    name: "",
    leads: 0,
    sales: "",
    quota: "",
    variance: "",
    region: "",
    status: "",
  });
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const isSalesPersonSelected = (salesPerson: SalesPerson) =>
    (salesPerson.status === selectedStatus || selectedStatus === "all") &&
    (selectedNames.includes(salesPerson.name) || selectedNames.length === 0);
  return (
    <div className={styles.container}>
        <div className={addUser ? styles.show : styles.hide}>
          <div className={styles.profilePic}>

          </div>
          <Title className={styles.head}>Profile Pic</Title>
          <Button onClick={()=>setAddUser(false)} className={styles.close}>X</Button>
          <Title className={styles.head}>User Name</Title>
          <TextInput className={styles.userName} icon={UserAddIcon} placeholder="User Name" />
          <Title className={styles.head}>Email</Title>
          <TextInput className={styles.userName} icon={IdentificationIcon} placeholder="User Email" />
          <Title className={styles.head}>Phone</Title>
          <NumberInput min={0} max={9999999999} className={styles.userName} icon={PhoneIcon} placeholder="User Phone" />

          <Button className={styles.submit} onClick={()=>setAddUser(false)} >Submit</Button>
        </div>
        <div className={styles.add}>
          <Button onClick={()=>setAddUser(true)} size="md">Add User +</Button>
        </div>
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
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell className="text-right">Leads</TableHeaderCell>
            <TableHeaderCell className="text-right">Sales (₹)</TableHeaderCell>
            <TableHeaderCell className="text-right">Quota (₹)</TableHeaderCell>
            <TableHeaderCell className="text-right">Variance</TableHeaderCell>
            <TableHeaderCell className="text-right">Region</TableHeaderCell>
            <TableHeaderCell className="text-right">Status</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {salesPeople
            .filter((item) => isSalesPersonSelected(item))
            .map((item) => (
              <TableRow key={item.name}>
                <TableCell style={{cursor:'pointer'}} onClick={()=>{setSelectUser(true); setUserDetails(item)}}>{item.name}</TableCell>
                <TableCell className="text-right">{item.leads}</TableCell>
                <TableCell className="text-right">{item.sales}</TableCell>
                <TableCell className="text-right">{item.quota}</TableCell>
                <TableCell className="text-right">{item.variance}</TableCell>
                <TableCell className="text-right">{item.region}</TableCell>
                <TableCell className="text-right" >
                  <BadgeDelta style={{cursor:'pointer'}} onClick={()=>setSelectUser(true)} deltaType={deltaTypes[item.status]} size="xs">
                    {item.status}
                  </BadgeDelta>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      </div>
      <div className={selectUser ? styles.selectUser : styles.hide}>
        <Button onClick={()=>{setSelectUser(false); setUpdateUser(false)}} className={styles.close}>X</Button>
        <Button onClick={()=>setUpdateUser(false)} className={ updateUser ? styles.back : styles.hide}>&#x25C0; Back</Button>
        <div className={ updateUser ? styles.hide : styles.userDetails}>
          <div>
            <div className={styles.profilePic}></div>
            <Title className={styles.head}>{useDetails.name}</Title>
            <Title className={styles.head}>User Region</Title>
            <div className={styles.data}>{useDetails.region}</div>
            <Title className={styles.head}>User Status</Title>
            <div className={styles.data}>{useDetails.status}</div>
            <Title className={styles.head}>User Sales</Title>
            <div className={styles.data}>{useDetails.sales}</div>
          </div>
          <div></div>
          <Button onClick={()=>setUpdateUser(true)} className={styles.submit}>Edit User</Button>
        </div>
        <div className={ updateUser ? styles.userDetails : styles.hide}>
          <div>
            <div className={styles.profilePic}></div>
            <Title className={styles.head}>Profile Pic</Title>
            <Title className={styles.head}>User Name</Title>
            <TextInput className={styles.userName} icon={UserAddIcon} placeholder="User Name" />
            <Title className={styles.head}>Email</Title>
            <TextInput className={styles.userName} icon={IdentificationIcon} placeholder="User Email" />
            <Title className={styles.head}>Phone</Title>
            <NumberInput min={0} max={9999999999}  className={styles.userName} icon={PhoneIcon} placeholder="User Phone" />
          </div>
          <div style={{marginTop:'110px'}}>
            <Title className={styles.head}>PAN</Title>
            <TextInput className={styles.userName} icon={IdentificationIcon} placeholder="User PAN" />
            <Title className={styles.head}>Subscription Status</Title>
            <input className={styles.subStatus} type='checkbox' id='bronze' value='bronze' />
            <label htmlFor='bronze'>Bronze</label><br />
            <input className={styles.subStatus} type='checkbox' id='silver' value='silver' />
            <label htmlFor='silver'>Silver</label><br />
            <input className={styles.subStatus} type='checkbox' id='gold' value='gold' />
            <label htmlFor='gold'>Gold</label><br />
            <Title className={styles.head}>Address</Title>
            <TextInput className={styles.userName} icon={HomeIcon} placeholder="User Address" />
          </div>
          <Button className={styles.submit} onClick={()=>setAddUser(false)} >Update</Button>
        </div>
      </div>
    </div>
  )
}
