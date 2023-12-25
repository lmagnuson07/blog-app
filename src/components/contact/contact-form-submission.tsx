'use server';

import { Db, InsertOneResult, MongoClient, MongoServerError } from 'mongodb';
import { z } from 'zod';

import { Contact } from '@/src/types/contact/contact';
const mongoUrl = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.gzgivfu.mongodb.net/?retryWrites=true&w=majority`;

export async function commentHandler(prevState: Contact, formData: FormData) {
  const schema = z.object({
    email: z.string().email().min(1, 'Email required'),
    name: z.string().min(1, 'Name required'),
    comment: z
      .string()
      .min(1, 'Comment required')
      .max(500, 'Comment cannot exceed 500 characters'),
  });
  const parsedData = schema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
    comment: formData.get('comment'),
  });

  if (!parsedData.success) {
    const error = parsedData.error.format();
    const emailMessage: string[] | undefined = error.email?._errors;
    const nameMessage: string[] | undefined = error.name?._errors;
    const commentMessage: string[] | undefined = error.comment?._errors;
    return {
      id: '',
      email: emailMessage?.join(', ') ?? '',
      name: nameMessage?.join(', ') ?? '',
      comment: commentMessage?.join(', ') ?? '',
      success: false,
    };
  } else {
    const url = mongoUrl;
    let client: MongoClient;
    try {
      client = new MongoClient(url, { family: 4 });
      await client.connect();
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.log(`Error connecting to db: ${error}`); // special case for some reason
      }
      return {
        id: '',
        email: '',
        name: 'Error connecting to db',
        comment: '',
        success: false,
      };
    }

    let result: InsertOneResult<Document>;
    try {
      const db: Db = client.db(process.env.mongodb_database);
      result = await db.collection('comments').insertOne({
        email: parsedData.data.email,
        name: parsedData.data.name,
        comment: parsedData.data.comment,
      });
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.log(`Error inserting into db: ${error}`);
      }
      return {
        id: '',
        email: '',
        name: 'Error inserting record db',
        comment: '',
        success: false,
      };
    } finally {
      await client.close();
    }

    return {
      id: result.insertedId.toString(),
      email: parsedData.data.email,
      name: parsedData.data.name,
      comment: parsedData.data.comment,
      success: true,
    };
  }
}
