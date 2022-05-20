import {Meteor} from "meteor/meteor";

import React from "react";
import styles from "./styles.module.css";

import {Outlet} from "react-router-dom";

import {Text} from "/imports/ui/components/Text";

import {MemberItem, MemberContainer} from "./components";

import {Link} from "react-router-dom";

import {updateStatus} from "/imports/api/methods/members";

interface MembersProps {
    user?: Meteor.User;
    members?: Meteor.User[];
}

const Members: React.FC<MembersProps> = ({user, members}) => {
    
    
    
    // const changeStatus = () => {
    //     updateStatus.call(
    //         {
    //             type: user?.status.type === UserStatus.OFFLINE
    //                 ? UserStatus.PRESENT
    //                 : UserStatus.OFFLINE,
    //             message: "qwerqwer"
    //         },
    //         (err, res) => {
    //             if (err) alert(err)
    //             else {
    //                 console.log(res)
    //             }
    //         }
    //     )
    // }
    
    
    return (
        <div className={styles.root}>
            <Text.main>멤버</Text.main>
            <MemberContainer title={"내 프로필"}>
                {user
                    ? <MemberItem member={user}/>
                    : <Link to="login">로그인이 필요합니다</Link>}
            </MemberContainer>
            <MemberContainer title={`동방 ${members?.length}`}>
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
