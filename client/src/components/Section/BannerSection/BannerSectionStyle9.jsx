import React from 'react';
import parse from 'html-react-parser';

export default function BannerSectionStyle9({ title, subTitle }) {
  return (
    <div className="container">
      <div className="cs_banner cs_style_9 cs_white_bg cs_radius_30">
        <div className="cs_banner_img">
          <img src="https://images.pexels.com/photos/263337/pexels-photo-263337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Banenr" />
        </div>
        <h2 className="cs_banner_title cs_fs_72">{parse(title)}</h2>
        <p className="cs_banner_subtitle cs_fs_20 m-0 cs_medium">
          {parse(subTitle)}
        </p>
      </div>
    </div>
  );
}
