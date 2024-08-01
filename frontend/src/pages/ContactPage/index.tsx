import Button from "@/components/Button";
import UserProfile from "@/components/UserProfile";
import Header from "@/layouts/Header";
import {
  useLazyFollowUserQuery,
  useLazyUnfollowUserQuery,
} from "@/services/FollowAPI";
import {
  useGetContactUsersQuery,
  useLazyGetContactUsersQuery,
} from "@/services/UserAPI";
import { getUserInfo } from "@/utils/auth";
import { IUserBEContactType } from "@/utils/user";
import { Alert, Table, TableColumnsType, Tag } from "antd";
import { TableRowSelection } from "antd/lib/table/interface";
import { useCallback, useEffect, useState } from "react";

enum ERole {
  ADMIN = 1,
  USER = 2,
}

export default function ContactPage() {
  const userInfo = getUserInfo();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<IUserBEContactType[]>([]);
  const [getContactUsers, { data, isSuccess, isFetching }] =
    useLazyGetContactUsersQuery();
  const [followUser] = useLazyFollowUserQuery();
  const [unFollowUser] = useLazyUnfollowUserQuery();

  const columns: TableColumnsType<IUserBEContactType> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      render: (_, record) => (
        <UserProfile
          idUser={record.id}
          image={record.image_profile}
          userDisplayName={record.name}
          isRounded
          canNegative
        />
      ),
    },
    { title: "Address", dataIndex: "address" },
    {
      title: "Role",
      dataIndex: "role_id",
      render: (value, record, index) => {
        return (
          <>
            {value === ERole.USER && <Tag color="green">User</Tag>}
            {value === ERole.ADMIN && <Tag color="warning">Admin</Tag>}
          </>
        );
      },
    },
    {
      title: "Following status",
      dataIndex: "is_followed",
      render: (value, _, i) => {
        return (
          <>
            {value ? (
              <Tag color="green">Following</Tag>
            ) : (
              <Tag color="blue">Not following</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Actions",
      render: (_: any, record: IUserBEContactType) => {
        return (
          <>
            {!record.is_followed && (
              <Button
                btnType="secondary"
                isRounded
                isFullWidth
                onClick={async () => {
                  await followUser({
                    user_id: record.id,
                    follower_id: userInfo.id,
                  });
                  await getContactUsers({ userId: userInfo.id });
                }}
              >
                Follow
              </Button>
            )}
            {record.is_followed && (
              <Button
                btnType="primary"
                isRounded
                isFullWidth
                onClick={async () => {
                  await unFollowUser({
                    user_id: record.id,
                    follower_id: userInfo.id,
                  });
                  await getContactUsers({ userId: userInfo.id });
                }}
              >
                Unfollow
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<IUserBEContactType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    getContactUsers({ userId: userInfo.id });
  }, []);

  useEffect(() => {
    if (data && isSuccess) {
      const cloneData = [...data].map((item) => ({
        key: item.id,
        ...item,
      }));
      setDataSource(cloneData);
    }
  }, [data, isSuccess, isFetching]);

  return (
    <>
      <Header />
      <div
        className="container"
        style={{ marginTop: "84px", maxWidth: "720px" }}
      >
        <Alert
          message="Contact users list"
          showIcon
          type="success"
          style={{
            marginBottom: "24px",
            borderRadius: "4px",
          }}
        />
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
    </>
  );
}
