import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

export default function TeamStyle2({
  profileImageUrl,

  doctorDepartment,
  name,

  doctorDescription,
  social,
  href,
  id,
}) {
  return (
    <div className="cs_team cs_style_1 cs_type_2 text-center cs_radius_20 overflow-hidden">
      <div className="cs_member_img">
        <Link to={`/doctors/${id}`} className="d-block">
          <img
            src={profileImageUrl}
            alt="Doctor"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Link>
        <div className="cs_label cs_white_color cs_accent_bg">
          {doctorDepartment}
        </div>
      </div>
      <div className="cs_team_meta cs_white_bg">
        <div>
          <h3 className="cs_member_name cs_fs_32">
            <Link to={href}>Dr. {name}</Link>
          </h3>
          <p className="cs_member_designation cs_heading_color cs_medium">
            {doctorDepartment}
          </p>
          {doctorDescription && (
            <p className="cs_member_description">{doctorDescription}</p>
          )}
        </div>
      </div>
    </div>
  );
}
