export type EventItem = {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string;
    time: string;
};

export const events: EventItem[] = [
    {
        image: "/images/event1.png",
        title: "Google I/O 2026",
        slug: "google-io-2026",
        location: "Mountain View, CA & Online",
        date: "2026-05-20",
        time: "10:00 AM",
    },
    {
        image: "/images/event2.png",
        title: "Apple WWDC 2026",
        slug: "apple-wwdc-2026",
        location: "Apple Park, Cupertino & Online",
        date: "2026-06-08",
        time: "9:30 AM",
    },
    {
        image: "/images/event3.png",
        title: "Microsoft Build 2026",
        slug: "ms-build-2026",
        location: "Seattle, WA & Online",
        date: "2026-05-05",
        time: "9:00 AM",
    },
    {
        image: "/images/event4.png",
        title: "React Summit 2026",
        slug: "react-summit-2026",
        location: "Amsterdam, Netherlands & Online",
        date: "2026-06-17",
        time: "10:00 AM",
    },
    {
        image: "/images/event5.png",
        title: "JSConf EU 2026",
        slug: "jsconf-eu-2026",
        location: "Berlin, Germany",
        date: "2026-03-25",
        time: "9:00 AM",
    },
    {
        image: "/images/event6.png",
        title: "HackMIT 2026",
        slug: "hackmit-2026",
        location: "Cambridge, MA",
        date: "2026-01-18",
        time: "8:00 AM",
    },
    {
        image: "/images/event-full.png",
        title: "DevOpsDays London 2026",
        slug: "devopsdays-london-2026",
        location: "London, UK",
        date: "2026-04-14",
        time: "9:00 AM",
    }

];
