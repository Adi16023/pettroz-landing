import type { Metadata } from "next";
import { ButtonLink, Card, CtaBand, H1, Kicker, Lead, Section } from "@/components/ui";

export const metadata: Metadata = { title: "About Us" };

const focusAreas = [
  "Business management software",
  "Automation and digital workflows",
  "Accounting and operational management",
  "Employee and workforce management",
  "Business intelligence and reporting",
  "Technology-driven solutions",
];

const principles = [
  {
    title: "User-centred design",
    text: "Create interfaces and workflows that are straightforward to understand and navigate.",
  },
  {
    title: "Intelligent automation",
    text: "Reduce repetitive work through practical automation and digital processes.",
  },
  {
    title: "Connected workflows",
    text: "Keep business information organised and accessible across day-to-day operations.",
  },
  {
    title: "Useful insights",
    text: "Help businesses understand their activities through meaningful information and reports.",
  },
  {
    title: "Room to grow",
    text: "Build solutions that can adapt as business requirements and organisations evolve.",
  },
];

const approach = [
  { title: "Understand", text: "Learn about business requirements, customer expectations, and everyday challenges." },
  { title: "Simplify", text: "Identify complicated processes and make them more organised and efficient." },
  { title: "Build", text: "Turn ideas into practical digital solutions through thoughtful design and technology." },
  { title: "Improve", text: "Keep looking for ways to enhance products as needs, technology, and feedback change." },
];

const audiences = [
  "Business owners seeking clearer operational visibility",
  "Managers coordinating teams and daily workflows",
  "Growing organisations managing more complex operations",
  "Teams and employees handling everyday tasks",
  "Multi-location businesses that need a centralised view",
];

const commitments = [
  "Create user-friendly software experiences",
  "Address real business requirements",
  "Maintain organised digital workflows",
  "Prioritise appropriate data security and access controls",
  "Provide helpful customer support",
  "Continuously improve our products",
  "Build long-term customer relationships",
];

const reasons = [
  { title: "Built around real needs", text: "Understand actual business challenges before developing solutions." },
  { title: "Simplicity in every experience", text: "Make powerful technology straightforward to understand and use." },
  { title: "Practical innovation", text: "Explore technology and automation that bring value to everyday work." },
  { title: "Connected experiences", text: "Bring business activities together through organised digital workflows." },
  { title: "Continuous improvement", text: "Keep looking for opportunities to improve and evolve products." },
  { title: "Growth-focused thinking", text: "Build solutions that can adapt as business requirements change." },
];

const missionGoals = [
  "Simplify complicated business processes",
  "Reduce repetitive manual work",
  "Improve operational efficiency",
  "Make business information easier to access",
  "Encourage smarter, technology-driven decisions",
  "Build solutions that evolve with changing needs",
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-20">
      <Kicker>About Pettroz</Kicker>
      <H1>Simplifying Business Management Through Technology.</H1>
      <Lead>
        We believe managing a business should be simpler, smarter, and more efficient. Pettroz
        develops practical software to help businesses organise operations, reduce manual work, and
        take better control of everyday activities.
      </Lead>
      <div className="mt-7 flex flex-wrap gap-3">
        <ButtonLink href="/products">Explore Our Products</ButtonLink>
        <ButtonLink href="/contact" variant="navy">Contact Us</ButtonLink>
      </div>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="story-heading">
        <h2 id="story-heading" className="text-2xl font-semibold tracking-tight text-navy">
          Built with a vision to make business management better
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <p className="text-sm leading-7 text-muted-foreground">
            Managing daily operations, maintaining records, coordinating employees, and tracking
            financial activity can become complicated when everything depends on manual processes
            and disconnected systems.
          </p>
          <p className="text-sm leading-7 text-muted-foreground">
            Pettroz was created to turn everyday business requirements into more organised digital
            experiences. We believe technology should make work easier, more accessible, and more
            efficient—not more complicated.
          </p>
        </div>
      </section>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold text-navy">Our Vision</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Make modern business technology accessible, practical, and useful for organisations of
            every size, helping them improve productivity and grow confidently.
          </p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-navy">Our Mission</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Develop reliable, user-friendly software that addresses real-world needs, simplifies
            complicated processes, reduces repetitive work, and makes business information easier
            to use.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {missionGoals.map((goal) => (
              <li key={goal} className="flex gap-2 text-sm leading-6 text-muted-foreground">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {goal}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="why-pettroz-heading">
        <h2 id="why-pettroz-heading" className="text-2xl font-semibold tracking-tight text-navy">
          Technology with purpose. Solutions that matter.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Good software should do more than provide features. It should solve problems, simplify work
          and create meaningful value for the people who use it.
        </p>
        <div className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <article key={reason.title} className="border-t border-navy/15 pt-5">
              <h3 className="font-semibold text-navy">{reason.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{reason.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="what-we-do-heading">
        <h2 id="what-we-do-heading" className="text-2xl font-semibold tracking-tight text-navy">
          Building technology that makes business management simpler
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          We focus on understanding real business challenges and turning them into practical,
          easy-to-use digital solutions. Our work brings together technology, automation, and
          thoughtful design.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area) => (
            <li key={area} className="rounded-xl border border-border bg-card px-4 py-4 text-sm font-medium text-navy">
              {area}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 grid gap-10 border-t border-border pt-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-navy">Technology with purpose</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Good software should solve problems, simplify work, and create meaningful value. We
            explore technology and automation when they can improve everyday business experiences.
          </p>
          <ul className="mt-6 space-y-4">
            {principles.map((principle) => (
              <li key={principle.title}>
                <h3 className="text-sm font-semibold text-navy">{principle.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{principle.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-navy">Understand. Simplify. Build. Improve.</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Every meaningful solution starts with understanding the problem and continues through
            learning and improvement.
          </p>
          <ol className="mt-6 space-y-5">
            {approach.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="pt-0.5 text-xs font-semibold tracking-wide text-primary">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-navy">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="who-we-serve-heading">
        <h2 id="who-we-serve-heading" className="text-2xl font-semibold tracking-tight text-navy">
          Technology for businesses moving forward
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => (
            <li key={audience} className="rounded-xl border border-border bg-card px-4 py-4 text-sm text-navy">
              {audience}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="commitment-heading">
        <h2 id="commitment-heading" className="text-2xl font-semibold tracking-tight text-navy">
          Building trust through better technology
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Businesses depend on software for important everyday activities. We aim to build around
          reliability, usability, appropriate access controls, and continuous improvement.
        </p>
        <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {commitments.map((item) => (
            <li key={item} className="text-sm leading-6 text-muted-foreground">• {item}</li>
          ))}
        </ul>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
          Lasting technology is built not just through code, but through understanding the people
          and businesses that depend on it.
        </p>
      </section>
      </Section>
      <CtaBand
        title="Let’s make business management smarter."
        text="Discover products that help make everyday work easier, improve workforce management and bring business activities into a more organised system."
        primary={{ href: "/products", label: "Explore our products" }}
        secondary={{ href: "/contact", label: "Talk to our team" }}
      />
    </>
  );
}
