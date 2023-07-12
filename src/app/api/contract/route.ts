import { prisma } from "@/app/lib/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    const signedToken = searchParams.get("signed-token");

    if (!signedToken) {
      return NextResponse.json(
        {
          ok: false,
          error: "Not exist token.",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        signedToken,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          ok: false,
          error: "Not exist token.",
        },
        {
          status: 400,
        }
      );
    }

    const contracts = await prisma.contract.findMany({
      where: {
        userId: user.id,
      },
      select: {
        address: true,
        user: true,
      },
    });

    return NextResponse.json({
      ok: true,
      contracts,
    });
  } catch (error) {
    console.error(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { address, signedToken } = body;

    if (!signedToken) {
      return NextResponse.json(
        {
          ok: false,
          error: "Not exist token.",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        signedToken,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          ok: false,
          error: "Not exist token.",
        },
        {
          status: 400,
        }
      );
    }

    const contract = await prisma.contract.create({
      data: {
        address,
        userId: user.id,
      },
    });

    return NextResponse.json({
      ok: true,
      contract,
    });
  } catch (error) {
    console.error(error);
  }
};
