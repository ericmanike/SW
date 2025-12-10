import {NextResponse,NextRequest} from "next/server";
import Payment from "@/models/Payment";
import dbConnect from "@/lib/dbConnect";
export interface IPayment {
  reference: string;
  amount: number;
  status: "success" | "failed" | "pending";
  currency?: string;        
  paymentMethod?: string;
  cardLast4?: string;
  name?: string;
  email?: string;
  message?: string;
  createdAt?: Date;          
  updatedAt?: Date;          
}



export async function GET(req:NextRequest){

    try{
        await dbConnect();
       const donations: IPayment[] = await Payment.find({}).sort({createdAt:-1});
       const totalDonations = await Payment.countDocuments();


     return NextResponse.json({donations:donations, totalDonations: totalDonations});

    }catch(error){
        return NextResponse.json({message:"Database connection error"}, {status:500});
    }
     
   











    return NextResponse.json({message:"Balance verification endpoint is working"});
}
