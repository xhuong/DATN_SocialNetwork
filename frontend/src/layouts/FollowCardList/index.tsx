import FollowCard from "@/components/FollowCard";
import { useLazyGetNotFollowingUserQuery } from "@/services/FollowAPI";

import girl from "@/assets/images/users/default.png";

import { useEffect, useState } from "react";
import { getUserInfo } from "@/utils/auth";
import { IFollowUserFE, mapUserFollowBEToUserFollowFE } from "@/utils/follow";

import styles from "./index.module.scss";

export default function FollowCardList() {
  const userInfo = getUserInfo();
  const [getNotFollowingUser, { data }] = useLazyGetNotFollowingUserQuery();
  const [followData, setFollowData] = useState<IFollowUserFE[]>([]);

  useEffect(() => {
    if (userInfo.id) {
      getNotFollowingUser({ id: userInfo.id });
    }
  }, []);

  useEffect(() => {
    if (data && data.result.data.length > 0) {
      const convertedData = mapUserFollowBEToUserFollowFE(data?.result?.data);
      setFollowData(convertedData);
    }
  }, [data]);

  return (
    <div className={styles.followCardList}>
      {followData?.map((user) => (
        <FollowCard user={user} key={user.id} />
      ))}
    </div>
  );
}
