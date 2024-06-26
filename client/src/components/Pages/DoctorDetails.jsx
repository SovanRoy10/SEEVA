import React, { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDoctor();
  }, [doctorId]);

  const loadDoctor = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/user/doctors/${doctorId}`
      );
      setDoctor(data.user);
      setLoading(false);
    } catch (error) {
      console.error("Error loading doctor:", error);
      setLoading(false);
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

  const degrees = doctor?.doctorDegrees?.map((degree) => ({
    title: degree.institution.trim(),
    subTitle: degree.description.trim(),
  }));

  const experience = doctor.doctorExperience?.map((experience) => ({
    title: experience,
  }));

  pageTitle(doctor.name);

  return (
    <>
      <Section bottomMd={190} bottomLg={150} bottomXl={110}>
        <DoctorDetailsSection
          bgUrl="/images/doctors/doctor_details_bg.svg"
          imgUrl={doctor.profileImageUrl}
          name={doctor.name}
          department={doctor.doctorDepartment}
          designation={`Board-certified ${doctor.doctorDepartment}`}
          description={doctor.doctorDescription}
          contactInfo={[
            { iconUrl: "/images/icons/call.svg", title: doctor.phone },
            { iconUrl: "/images/icons/envlope.svg", title: doctor.email },
          ]}
          contactInfoHeading="Contact Info"
          schedules={schedules}
          scheduleHeading="Appointment Schedules"
          degrees={degrees}
          degreesHeading="Degrees"
          experiences={experience}
          experiencesHeading="Experiences"
          loading={loading}
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
