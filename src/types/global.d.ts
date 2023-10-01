declare global {
  namespace Models {
    interface ApiBadRequest {
      message: string;
    }

    interface MakeOffer {
      startAmount: number;
      itemName: string;
      expiration: Date;
    }

    interface Offer {
      auction_id: number;
      auction_itemName: string;
      auction_created_by: string;
      auction_startPrice: string;
      auction_created_at: Date;
      auction_expiration: Date;
      auction_updated_at: Date;
      auction_status: "PENDING" | "ONGOING" | "COMPLETED";
      currentBid: string;
    }

    interface BidOffer {
      amount: number;
    }

    interface UserBalance {
      balance: number;
    }

    interface User {
      id: number;
      userName: string;
    }

    interface JwtResponse {
      access_token;
    }

    interface TokenData {
      sub: number;
      username: string;
      iat: number;
      exp: number;
    }

    type AuctionBid = {
      id: number;
      created_at: string;
      updated_at: string;
      amount: string;
      userId: number;
      auctionId: number;
      user: {
        email: string;
        id: number;
        created_at: string;
        updated_at: string;
      };
      auction: {
        id: number;
        itemName: string;
        created_by: string;
        startPrice: string;
        created_at: string;
        expiration: string;
        updated_at: string;
        status: string;
      };
    };
  }
}

export {};
