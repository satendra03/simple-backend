import { CartRepositoryInterface } from "./cart.repository.interface.js";
import { CollectionReference } from "firebase-admin/firestore";
import { Cart, CartDb } from "../model/cart.model.js";
import { db } from "../../../config/firebase.js";
import { CreateCartInput, UpdateCartInput } from "../model/cartInput.model.js";

export class FireStoreCartRepository implements CartRepositoryInterface {
    private collection: CollectionReference<CartDb>
    constructor() {
        this.collection = db.collection("carts") as CollectionReference<CartDb>;
    }

    getAll = async (): Promise<Cart[]> => {
        const collectionSnapshot = await this.collection.get();
        return collectionSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...(data as CartDb)
            };
        });
    }
    getById = async (id: string): Promise<Cart | null> => {
        const docRef = this.collection.doc(id);
        const doc = await docRef.get();
        if (!doc.exists) { return null; }

        const data = doc.data();
        if (!data) { return null; }

        return {
            id: doc.id,
            ...(data as CartDb)
        };
    }
    create = async (cartInput: CreateCartInput): Promise<Cart> => {
        const now = new Date();
        const doc = await this.collection.add({
            ...cartInput,
            createdAt: now,
            updatedAt: now,
        });
        return {
            id: doc.id,
            ...cartInput,
            createdAt: now,
            updatedAt: now,
        };
    }
    update = async (id: string, updates: UpdateCartInput): Promise<Cart | null> => {
        const docRef = this.collection.doc(id);
        let doc = await docRef.get();
        if (!doc.exists) { return null; }

        const now = new Date();
        await docRef.update({
            ...updates,
            updatedAt: now,
        });

        doc = await docRef.get();
        const data = doc.data();
        if (!data) { return null; }

        return {
            id: doc.id,
            ...(data as CartDb)
        };
    }
    delete = async (id: string): Promise<Cart | null> => {
        const docRef = this.collection.doc(id);
        const doc = await docRef.get();
        if (!doc.exists) { return null; }

        const data = doc.data();
        if (!data) { return null; }

        await docRef.delete();
        return {
            id: doc.id,
            ...(data as CartDb)
        };
    }
}