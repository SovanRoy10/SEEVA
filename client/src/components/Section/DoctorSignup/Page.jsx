import React from "react";
import AboutSectionStyle2 from "../AboutSection/AboutSectionStyle2";
import FeaturesSectionStyle3 from "../FeaturesSection/FeaturesSectionStyle3";
import { pageTitle } from "../../../helpers/PageTitle";
import BannerSectionStyle7 from "../BannerSection/BannerSectionStyle7";
import BreadcrumbStyle2 from "../../Breadcrumb/BreadcrumbStyle2";
import TeamSectionStyle3 from "../TeamSection/TeamSectionStyle3";
import Section from "..";
import SignupSection from "./FormSection";

const featureData = [
  {
    title: "Neurology Department",
    subTitle:
      "The neurology department specializes in diagnosing and treating disorders of the nervous system, including the brain, spinal cord, nerves, and muscles.",
    iconUrl: "https://www.svgrepo.com/show/39705/brain.svg",
  },
  {
    title: "Cardiology Department",
    subTitle:
      "The cardiology department focuses on the diagnosis and treatment of heart-related conditions, ranging from coronary artery disease to heart rhythm abnormalities.",
    iconUrl: "/images/departments/icon_11.svg",
  },
  {
    title: "Obstetrics and Gynecology",
    subTitle:
      "The Obstetrics and Gynecology department specializes in women's reproductive health, encompassing prenatal care, childbirth, gynecological surgeries, and comprehensive wellness services.",
    iconUrl: "https://www.svgrepo.com/show/493390/baby.svg",
  },
  {
    title: "Pediatric Department",
    subTitle:
      "The Pediatric Department provides regular developmental screenings to identify any delays or concerns and provide early intervention services.",
    iconUrl: "https://www.svgrepo.com/show/530384/food.svg",
  },
];

const doctorData = [
  {
    imgUrl: "/images/departments/related_doctor_1.jpeg",
    name: "Dr. Susan Bones, MD",
    designation: "Board-certified Pediatrician",
    description:
      "With experience in managing complex <br />medical conditions in children",
    social: [
      { icon: "fa6-brands:facebook-f", href: "/about" },
      { icon: "fa6-brands:linkedin-in", href: "/about" },
      { icon: "fa6-brands:twitter", href: "/about" },
    ],
    availableUrl: "/",
    callUrl: "/",
    chatUrl: "/",
    btnText: "Booking",
    btnUrl: "/appointments",
  },
  {
    imgUrl: "/images/departments/related_doctor_1.jpeg",
    name: "Dr. Susan Bones, MD",
    designation: "Board-certified Pediatrician",
    description:
      "With experience in managing complex <br />medical conditions in children",
    social: [
      { icon: "fa6-brands:facebook-f", href: "/about" },
      { icon: "fa6-brands:linkedin-in", href: "/about" },
      { icon: "fa6-brands:twitter", href: "/about" },
    ],
    availableUrl: "/",
    callUrl: "/",
    chatUrl: "/",
    btnText: "Booking",
    btnUrl: "/",
  },
  {
    imgUrl: "/images/departments/related_doctor_1.jpeg",
    name: "Dr. Susan Bones, MD",
    designation: "Board-certified Pediatrician",
    description:
      "With experience in managing complex <br />medical conditions in children",
    social: [
      { icon: "fa6-brands:facebook-f", href: "/about" },
      { icon: "fa6-brands:linkedin-in", href: "/about" },
      { icon: "fa6-brands:twitter", href: "/about" },
    ],
    availableUrl: "/",
    callUrl: "/",
    chatUrl: "/",
    btnText: "Booking",
    btnUrl: "/",
  },
  {
    imgUrl: "/images/departments/related_doctor_1.jpeg",
    name: "Dr. Susan Bones, MD",
    designation: "Board-certified Pediatrician",
    description:
      "With experience in managing complex <br />medical conditions in children",
    social: [
      { icon: "fa6-brands:facebook-f", href: "/about" },
      { icon: "fa6-brands:linkedin-in", href: "/about" },
      { icon: "fa6-brands:twitter", href: "/about" },
    ],
    availableUrl: "/",
    callUrl: "/",
    chatUrl: "/",
    btnText: "Booking",
    btnUrl: "/",
  },
];

export default function DepartmentDetails() {
  pageTitle("Department Details");
  return (
    <>
      <BreadcrumbStyle2 />
      <Section topMd={135} topLg={100} topXl={100}>
        <AboutSectionStyle2
          title="We need more Doctors!🩺"
          subTitle="Seeking additional doctors to join our team in delivering exceptional patient care across various specialties. Candidates should be passionate, compassionate, and dedicated to providing high-quality medical services to our community."
          imgUrl="https://images.pexels.com/photos/4769130/pexels-photo-4769130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </Section>

      <Section topMd={170} topLg={145} topXl={90}>
        <FeaturesSectionStyle3
          sectionTitle="Departments"
          sectionTitleUp="Actively hiring"
          data={featureData}
        />
      </Section>
      <Section topMd={200} topLg={150} topXl={100}>
        <TeamSectionStyle3 sectionTitle="Admins" data={doctorData} />
      </Section>

      {/* Start Appointment Section */}
      <Section
        topMd={190}
        topLg={145}
        topXl={105}
        bottomMd={190}
        bottomLg={145}
        bottomXl={110}
        id="appointment"
      >
        <SignupSection
          sectionTitle="Doctor"
          sectionTitleUp="Join us as a"
          imgUrl="/images/home_1/appointment.jpeg"
        />
      </Section>
      {/* End Appointment Section */}
      <Section className="cs_footer_margin_0">
        <BannerSectionStyle7
          imgUrl="https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          bgUrl="/images/departments/banner_bg_3.svg"
          title="Don’t Let Your Health <br />Take a Backseat!"
          subTitle="Schedule an appointment with one of our experienced <br />medical professionals today!"
        />
      </Section>
    </>
  );
}
