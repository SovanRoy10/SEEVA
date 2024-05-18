import React from 'react';
import SideMenuWidget from '../Widget/SideMenuWidget';
import RecentPostWidget from '../Widget/RecentPostWidget';
// import NewsletterStyle5 from '../Widget/NewsletterStyle5';
const categoryData = [
  {
    title: 'Health Tips and Tricks',
    url: 'https://aawellnessproject.org/dr-mikes-corner/?gad_source=1&gclid=CjwKCAjwo6GyBhBwEiwAzQTmc2YOfhzE2MYDZQBqOms-hq1uvcfNWXtU0rdX3F5yoo1LYINqBgHx9xoCsD4QAvD_BwE',
  },
  {
    title: 'Trends and Analysis',
    url: 'https://www.netscribes.com/healthcare-market-analysis/#:~:text=FAQs-,1.,care%20are%20some%20key%20trends.',
  },
  {
    title: 'Time Management',
    url: 'https://www.ambula.io/importance-of-time-management-in-healthcare/#:~:text=Effective%20time%20management%20can%20also,relationships%20with%20family%20and%20friends.',
  },
];
const recentPostData = [
  {
    title: `A Parent's Guide to Childhood Vaccinations: What You Need to Know`,
    author: 'Laura Dorwart',
    date: 'September 18, 2023',
    href: 'https://www.verywellhealth.com/parents-guide-to-vaccines-for-children-5209358#:~:text=Vaccines%20are%20one%20of%20the,the%20time%20they%20turn%2018.',
  },
  {
    title: `Preventing Heart Disease: Tips for a Heart-Healthy Lifestyle`,
    author: 'Mayo Clinic',
    date: 'August 09, 2022',
    href: 'https://www.mayoclinic.org/diseases-conditions/heart-disease/in-depth/heart-disease-prevention/art-20046502',
  },
  {
    title: `Managing Chronic Pain: Treatment Options and Strategies`,
    author: 'Unknown',
    date: 'Unknown',
    href: 'https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/pain-and-pain-management-adults',
  },
  {
    title: `The Role of Physical Therapy in Injury Recovery and Prevention`,
    author: 'Lorie Smith',
    date: 'January 11, 2024',
    href: 'https://www.medicalnewstoday.com/articles/160645',
  },
  {
    title: `Allergies and Asthma: Causes, Symptoms, and Treatment Options`,
    author: 'Katie Cameron',
    date: 'June 9, 2024',
    href: 'https://www.webmd.com/asthma/what-is-asthma',
  },
];

export default function Sidebar() {
  return (
    <div className="cs_sidebar">
      <div className="cs_sidebar_item widget_categories">
        <SideMenuWidget title="Popular Categories" data={categoryData} />
      </div>
      <div className="cs_sidebar_item">
        <RecentPostWidget title="Popular Articles" data={recentPostData} />
      </div>
      {/* <div className="cs_sidebar_item widget_categories">
        <NewsletterStyle5 title="Newsletter Sign Up Form" />
      </div> */}
    </div>
  );
}
