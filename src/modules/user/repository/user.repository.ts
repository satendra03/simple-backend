import { UserRepositoryInterface } from "./user.repository.interface.js";
import { User, UserDb } from "../model/user.model.js";
import { CreateUserInput, UpdateUserInput } from "../model/userInput.model.js";
import { CollectionReference } from "firebase-admin/firestore";
import { db } from "../../../config/firebase.js";

export class FireStoreUserRepository implements UserRepositoryInterface {
    private collection: CollectionReference<UserDb>;
    constructor() {
        this.collection = db.collection("users") as CollectionReference<UserDb>;
    }
    
    getAll = async (): Promise<User[]> => {
        const collectionSnapshot = await this.collection.get();
        return collectionSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...(data as UserDb)
            };
        });
    }
    getById = async (userId: string): Promise<User | null> => {
        const docRef = this.collection.doc(userId);
        const doc = await docRef.get();

        if (!doc.exists) return null;

        const data = doc.data();
        if (!data) return null;

        return {
            id: doc.id,
            ...(data as UserDb)
        };
    }
    create = async (user: CreateUserInput): Promise<User> => {
        const now = new Date();
        const doc = await this.collection.add({
            ...user,
            createdAt: now,
            updatedAt: now,
        });
        return {
            id: doc.id,
            ...user,
            createdAt: now,
            updatedAt: now,
        };
    }
    update = async (userId: string, updates: UpdateUserInput): Promise<User> => {
        const docRef = this.collection.doc(userId);
        const now = new Date();

        await docRef.update({
            ...updates,
            updatedAt: now,
        });

        const doc = await docRef.get();
        const data = doc.data();
        
        return {
            id: doc.id,
            ...(data as UserDb),
        };
    }
    delete = async (userId: string): Promise<User | null> => {
        const docRef = this.collection.doc(userId);
        const doc = await docRef.get();
        const data = doc.data();
        if (!data) return null;
        await docRef.delete();
        return {
            id: doc.id,
            ...(data as UserDb),
        };
    }
}