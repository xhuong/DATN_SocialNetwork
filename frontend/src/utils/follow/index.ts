export interface IFollowUserBE {
  id: number;
  name: string;
  address: string;
  image_profile: string;
}

// export interface IFollowPayloadDto {
//   created_at: string;
//   user_id: number;
//   follower_id: number;
// }

export interface IFollowUserResponseType {
  status: number;
  message: string;
  result: {
    data: IFollowUserBE[];
  };
}

export interface IOnFollowUserResponseType {
  status: number;
  message: string;
  result: {
    data: boolean;
  };
}

export interface IFollowUserPayload {
  user_id: number;
  follower_id: number;
}

export interface IFollowUserFE {
  id: number;
  name: string;
  address: string;
  imageUrl: string;
}

export interface IFollowUserFEOmitAddress
  extends Omit<IFollowUserFE, "address"> {}

export const mapUserFollowBEToUserFollowFE = (
  list: IFollowUserBE[]
): IFollowUserFE[] => {
  return list.map((item) => ({
    id: item.id,
    name: item.name,
    address: item.address,
    imageUrl: item.image_profile,
  }));
};

export const mapUserFollowBEToUserFollowFEWithouAddress = (
  list: IFollowUserBE[]
): IFollowUserFEOmitAddress[] => {
  return list.map((item) => ({
    id: item.id,
    name: item.name,
    imageUrl: item.image_profile,
  }));
};
