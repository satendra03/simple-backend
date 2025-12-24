// Firebase Repository
import { ProductRepository } from "./product.repository.interface.js";
import { CollectionReference } from "firebase-admin/firestore";
import { db } from "../../../config/firebase.js";
import { ProductDb, Product } from "../model/product.model.js";
import { CreateProductInput, UpdateProductInput } from "../model/productInput.model.js";

export class FireStoreProductRepository implements ProductRepository {
    private collection: CollectionReference<ProductDb>;
    constructor() {
        this.collection = db.collection("products") as CollectionReference<ProductDb>;
    }

    async getAll(): Promise<Product[]> {
        const CollectionSnapshot = await this.collection.get(); // Collection snapshot

        return CollectionSnapshot.docs.map((doc) => {
            const data = doc.data(); // Doc data
            return {
                id: doc.id,
                name: data.name,
                description: data.description,
                price: data.price,
                image: data.image,
                category: data.category,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            };
        });
    }
    async getById(id: string): Promise<Product | null> {
        const docRef = this.collection.doc(id); // Doc refrence
        const doc = await docRef.get(); // Doc snapshot

        if (!doc.exists) { return null; } // Doc not found

        const data = doc.data(); // Doc data
        if (!data) { return null; } // Doc data not found

        return {
            id: doc.id,
            name: data.name,
            description: data.description,
            price: data.price,
            image: data.image,
            category: data.category,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        }; // Return product
    }
    async create(product: CreateProductInput): Promise<Product> {
        const now = new Date(); // Current time
        const doc = await this.collection.add({
            ...product,
            createdAt: now,
            updatedAt: now,
        }); // Add doc
        return {
            id: doc.id,
            ...product,
            createdAt: now,
            updatedAt: now,
        }; // Return product
    }
    async update(id: string, updates: UpdateProductInput): Promise<Product | null> {
        const docRef = this.collection.doc(id); // Doc refrence
        let doc = await docRef.get(); // Doc snapshot
        if (!doc.exists) { return null; } // Doc not found
        
        const now = new Date(); // Current time
        await docRef.update({
            ...updates,
            updatedAt: now,
        }); // Update doc

        doc = await docRef.get();
        const data = doc.data();
        if (!data) { return null; } // Doc data not found

        return {
            id: doc.id,
            ...(data as ProductDb),
        }; // Return updated doc
    }
    async delete(id: string): Promise<Product | null> {
        const docRef = this.collection.doc(id); // Doc refrence
        const doc = await docRef.get(); // Doc snapshot
        if (!doc.exists) { return null; } // Doc not found

        const data = doc.data();
        if (!data) return null;

        await docRef.delete(); // Delete doc

        return {
            id: doc.id,
            ...(data as ProductDb),
        }; // Return deleted product
    }
}