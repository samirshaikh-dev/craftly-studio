import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  getCountFromServer,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { LeadRecord, UpdateLeadInput } from "@/types/lead";

const COLLECTION = "leads";

export async function getLeads(): Promise<LeadRecord[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as LeadRecord));
}

export async function getLeadById(id: string): Promise<LeadRecord | null> {
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as LeadRecord;
}

export async function updateLead(id: string, data: UpdateLeadInput): Promise<void> {
  const updatePayload: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };
  if (data.status !== undefined) updatePayload.status = data.status;
  if (data.notes !== undefined) updatePayload.notes = data.notes;

  await updateDoc(doc(db, COLLECTION, id), updatePayload);
}

export async function deleteLead(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function getLeadsCount(): Promise<number> {
  const snap = await getCountFromServer(collection(db, COLLECTION));
  return snap.data().count;
}

export async function getNewLeadsCount(): Promise<number> {
  const q = query(collection(db, COLLECTION), where("status", "==", "new"));
  const snap = await getCountFromServer(q);
  return snap.data().count;
}

