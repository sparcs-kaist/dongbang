import {Meteor} from "meteor/meteor";

import React from "react";
import styles from "./styles.module.css";

import {Outlet} from "react-router-dom";

import {Text} from "/imports/ui/components/Text";

import {MemberItem, MemberContainer} from "./components";

import {useTracker} from "meteor/react-meteor-data";

import {Link} from "react-router-dom";

import {updateStatus} from "/imports/api/methods/members";
import {UserStatus} from "/imports/db/users";

import {userQuery} from "/imports/api/query/members";
import {useQueryData} from "/imports/common/hooks/useQueryData";

interface MembersProps {
    user: Meteor.User | null;
    members?: Meteor.User[];
}

const Members: React.FC<MembersProps> = ({user, members}) => {
    
    
    
    const changeStatus = () => {
        updateStatus.call(
            {
                type: user?.status.type === UserStatus.OFFLINE
                    ? UserStatus.PRESENT
                    : UserStatus.OFFLINE,
                message: "qwerqwer"
            },
            (err, res) => {
                if (err) alert(err)
                else {
                    console.log(res)
                }
            }
        )
    }
    
    
    return (
        <div className={styles.root}>
            <Text.main>멤버</Text.main>
            <Text.sub>내 프로필</Text.sub>
            <MemberContainer>
                {user
                    ? <MemberItem member={user}/>
                    : <Link to="login">로그인이 필요합니다</Link>}
            </MemberContainer>
            
            
            <Text.sub>동방 {members?.length}</Text.sub>
            <MemberContainer>
                {members?.map(member =>
                    <MemberItem
                        key={member._id}
                        member={member}
                    />
                )}
            </MemberContainer>
            <Outlet/>
        </div>
    )
}

export default Members;
