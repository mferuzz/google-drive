import Header from "@/components/shared/header";
import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ListItem from "@/components/shared/list-item";
import Empty from "@/components/shared/empty";

const getData = async (uid: string, type: "files" | "folders") => {
  let data: any[] = [];
  const q = query(
    collection(db, type),
    where("uid", "==", uid),
    where("isArchive", "==", false),
    limit(4)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });
  return data;
};

const RecentPage = async () => {
  const { userId } = auth();
  const folders = await getData(userId!, "folders");
  const files = await getData(userId!, "files");
  return (
    <>
      <Header label="Recent" isHome={false} />
      {[...files, ...folders].length === 0 ? (
        <Empty />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>File size</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...folders, ...files].map((folder) => (
              <ListItem key={folder.id} item={folder} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default RecentPage;
