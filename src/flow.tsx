import type { UnionToIntersection } from "type-fest";
import type { s, Flow } from "@formity/react";

import { z } from "zod";

import type { Steps, FormStep, ReviewStep } from "./types/steps";
import type { FormStatus } from "./types/status";

import { Form } from "./components/form";
import { Review } from "./components/review";

import * as constants from "./constants";
import * as format from "./utils/format";

type Values = UnionToIntersection<Fields[keyof Fields]>;

type Fields = {
  profile: {
    name: string;
    email: string;
    jobTitle: string;
  };
  company: {
    companyName: string;
    industry: string;
    companySize: string;
  };
  workspace: {
    workspaceName: string;
    timezone: string;
    language: string;
  };
};

const profile: FormStep<Fields["profile"]> = {
  id: "profile",
  label: "Your profile",
  subtitle: "Name and contact details",
  zod: z.object({
    name: z.string().nonempty("Please enter your full name"),
    email: z.email("Please enter a valid email address"),
    jobTitle: z.string().nonempty("Please enter your job title"),
  }),
};

const company: FormStep<Fields["company"]> = {
  id: "company",
  label: "Your company",
  subtitle: "Industry and team size",
  zod: z.object({
    companyName: z.string().nonempty("Please enter your company name"),
    industry: z.string().nonempty("Please select your industry"),
    companySize: z.string().nonempty("Please select your company size"),
  }),
};

const workspace: FormStep<Fields["workspace"]> = {
  id: "workspace",
  label: "Your workspace",
  subtitle: "Name, timezone and language",
  zod: z.object({
    workspaceName: z.string().nonempty("Please enter a workspace name"),
    timezone: z.string().nonempty("Please select a timezone"),
    language: z.string().nonempty("Please select a language"),
  }),
};

const review: ReviewStep = {
  id: "review",
  label: "Review & launch",
  subtitle: "Confirm and go live",
};

export const steps: Steps = [profile, company, workspace, review];

export type Schema = {
  render: React.ReactNode;
  struct: [
    s.Jump<s.Form<Fields["profile"]>>,
    s.Jump<s.Form<Fields["company"]>>,
    s.Jump<s.Form<Fields["workspace"]>>,
    s.Jump<s.Form<Record<never, never>>>,
    s.Return<Values>,
  ];
  inputs: Values;
  params: {
    status: FormStatus;
  };
};

export const flow: Flow<Schema> = [
  {
    jump: {
      id: profile.id,
      at: {
        form: {
          fields: (values) => ({
            name: [values.name, []],
            email: [values.email, []],
            jobTitle: [values.jobTitle, []],
          }),
          render: ({ fields, next, jump }) => (
            <Form
              key={profile.id}
              defaultValues={fields}
              validate={profile.zod}
              heading="Tell us about yourself"
              message="We'll use this to personalise your experience."
              content={[
                {
                  type: "input",
                  name: "name",
                  label: "Full name",
                  placeholder: "Jane Smith",
                },
                {
                  type: "input",
                  name: "email",
                  label: "Work email",
                  placeholder: "jane@company.com",
                  inputType: "email",
                },
                {
                  type: "input",
                  name: "jobTitle",
                  label: "Job title",
                  placeholder: "Product Manager",
                },
              ]}
              buttons={{ back: null, next: "Continue" }}
              next={next}
              jump={jump}
              prev={null}
            />
          ),
        },
      },
    },
  },
  {
    jump: {
      id: company.id,
      at: {
        form: {
          fields: (values) => ({
            companyName: [values.companyName, []],
            industry: [values.industry, []],
            companySize: [values.companySize, []],
          }),
          render: ({ fields, next, jump }) => (
            <Form
              key={company.id}
              defaultValues={fields}
              validate={company.zod}
              heading="About your company"
              message="Help us understand the context you're working in."
              content={[
                {
                  type: "input",
                  name: "companyName",
                  label: "Company name",
                  placeholder: "Acme Inc.",
                },
                {
                  type: "select",
                  name: "industry",
                  label: "Industry",
                  placeholder: "Select an industry",
                  options: constants.industries,
                },
                {
                  type: "select",
                  name: "companySize",
                  label: "Company size",
                  placeholder: "Select a size",
                  options: constants.companySizes,
                },
              ]}
              buttons={{ back: "Back", next: "Continue" }}
              next={next}
              jump={jump}
              prev={profile.id}
            />
          ),
        },
      },
    },
  },
  {
    jump: {
      id: workspace.id,
      at: {
        form: {
          fields: (values) => ({
            workspaceName: [values.workspaceName, []],
            timezone: [values.timezone, []],
            language: [values.language, []],
          }),
          render: ({ fields, next, jump }) => (
            <Form
              key={workspace.id}
              defaultValues={fields}
              validate={workspace.zod}
              heading="Set up your workspace"
              message="Give your workspace a name and configure your region."
              content={[
                {
                  type: "input",
                  name: "workspaceName",
                  label: "Workspace name",
                  placeholder: "My Workspace",
                },
                {
                  type: "select",
                  name: "timezone",
                  label: "Timezone",
                  placeholder: "Select a timezone",
                  options: constants.timezones,
                },
                {
                  type: "select",
                  name: "language",
                  label: "Language",
                  placeholder: "Select a language",
                  options: constants.languages,
                },
              ]}
              buttons={{ back: "Back", next: "Continue" }}
              next={next}
              jump={jump}
              prev={company.id}
            />
          ),
        },
      },
    },
  },
  {
    jump: {
      id: review.id,
      at: {
        form: {
          fields: () => ({}),
          render: ({ values, params, next, jump }) => (
            <Review
              key={review.id}
              heading="Review & launch"
              message="Everything look right? Launch your workspace."
              content={[
                {
                  text: "Profile",
                  rows: [
                    { label: "Full name", value: format.text(values.name) },
                    { label: "Work email", value: format.text(values.email) },
                    {
                      label: "Job title",
                      value: format.text(values.jobTitle),
                    },
                  ],
                },
                {
                  text: "Company",
                  rows: [
                    {
                      label: "Company name",
                      value: format.text(values.companyName),
                    },
                    {
                      label: "Industry",
                      value: format.industry(values.industry),
                    },
                    {
                      label: "Company size",
                      value: format.companySize(values.companySize),
                    },
                  ],
                },
                {
                  text: "Workspace",
                  rows: [
                    {
                      label: "Workspace name",
                      value: format.text(values.workspaceName),
                    },
                    {
                      label: "Timezone",
                      value: format.timezone(values.timezone),
                    },
                    {
                      label: "Language",
                      value: format.language(values.language),
                    },
                  ],
                },
              ]}
              buttons={{ back: "Back", next: "Launch workspace" }}
              next={next}
              jump={jump}
              prev={workspace.id}
              status={params.status}
            />
          ),
        },
      },
    },
  },
  {
    return: (values) => values,
  },
];

export const initialValues: Values = {
  name: "",
  email: "",
  jobTitle: "",
  companyName: "",
  industry: "",
  companySize: "",
  workspaceName: "",
  timezone: "",
  language: "",
};
