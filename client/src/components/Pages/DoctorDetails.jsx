import React, { useEffect, useState } from "react";
// import BreadcrumbStyle2 from "../Breadcrumb/BreadcrumbStyle2";
import Section from "../Section";
import BannerSectionStyle9 from "../Section/BannerSection/BannerSectionStyle9";
import DoctorDetailsSection from "../Section/DoctorDetailsSection";
import AppointmentSectionStyle2 from "../Section/AppointmentSection/AppointmentSectionStyle2";
import { pageTitle } from "../../helpers/PageTitle";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function DoctorDetails() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState({});

  useEffect(() => {
    loadDoctor();
  }, []);
  const loadDoctor = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/user/doctors/${doctorId}`
      );
      console.log(data.user);
      setDoctor(data.user);
    } catch (error) {
      console.error("Error loading doctor:", error);
    }
  };
  const dayToSchedule = {
    monday: { day: "Monday", time: doctor.startTime + "-" + doctor.endTime },
    tuesday: { day: "Tuesday", time: doctor.startTime + "-" + doctor.endTime },
    wednesday: {
      day: "Wednesday",
      time: doctor.startTime + "-" + doctor.endTime,
    },
    thursday: {
      day: "Thursday",
      time: doctor.startTime + "-" + doctor.endTime,
    },
    friday: { day: "Friday", time: doctor.startTime + "-" + doctor.endTime },
    saturday: {
      day: "Saturday",
      time: doctor.startTime + "-" + doctor.endTime,
    },
    sunday: { day: "Sunday", time: doctor.startTime + "-" + doctor.endTime },
  };
  const schedules = Object.keys(doctor)
    .filter((day) => doctor[day] === true)
    .map((day) => dayToSchedule[day.toLowerCase()]);
  const degrees = doctor.doctorDegree?.map((degree) => ({
    title: degree.institution.trim(),
    subTitle: degree.description.trim(),
  }));
  const experience = doctor.doctorExperience?.map((experience) => ({
    title: experience,
  }));
  // console.log(schedules);
  // console.log(degrees);
  console.log(experience);
  pageTitle(doctor.name);
  return (
    <>
      {/* {JSON.stringify(doctor, null, 4)} */}
      {/* <BreadcrumbStyle2 /> */}
      <Section bottomMd={190} bottomLg={150} bottomXl={110}>
        <DoctorDetailsSection
          bgUrl="/images/doctors/doctor_details_bg.svg"
          imgUrl={doctor.profileImageUrl}
          name={doctor.name}
          department={doctor.doctorDepartment}
          designation={`Board-certified ${doctor.doctorDepartment}`}
          description={doctor.doctorDescription}
          // social={[
          //   { icon: "fa6-brands:facebook-f", href: "/about" },
          //   { icon: "fa6-brands:linkedin-in", href: "/about" },
          //   { icon: "fa6-brands:twitter", href: "/about" },
          // ]}
          contactInfo={[
            { iconUrl: "/images/icons/call.svg", title: doctor.phone },
            {
              iconUrl: "/images/icons/envlope.svg",
              title: doctor.email,
            },
          ]}
          contactInfoHeading="Contact Info"
          schedules={schedules}
          scheduleHeading="Appointment Schedules"
          degrees={degrees}
          degreesHeading="Degrees"
          experiences={experience}
          experiencesHeading="Experiences"
          // awards={[
          //   { title: "Fellow of the American Psychiatric Association (FAPA)." },
          //   {
          //     title:
          //       "Recognized for research contributions with grants from the National Institute of Mental Health (NIMH) and the American Foundation for Suicide Prevention.",
          //   },
          // ]}
          // awardHeading="Awards/Achievements"
        />
      </Section>
      <Section bottomMd={200} bottomLg={150} bottomXl={110}>
        <AppointmentSectionStyle2
          bgUrl="/images/home_2/appointment_bg.svg"
          imgUrl="/images/home_2/appointment_img.png"
          sectionTitle="Appointment"
          sectionTitleUp="BOOK AN"
        />
      </Section>

      <Section className="cs_footer_margin_0">
        <BannerSectionStyle9
          title="Don’t Let Your Health <br />Take a Backseat!"
          subTitle="Schedule an appointment with one of our experienced <br />medical professionals today!"
          imgUrl="/images/doctors/banner_img_3.png"
        />
      </Section>
    </>
  );
}
