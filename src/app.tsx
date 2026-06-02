import type { OnReturn, ReturnOutput } from "@formity/react";

import { useState, useCallback } from "react";
import { useFormity } from "@formity/react";

import type { Status, FormStatus } from "./types/status";

import { Sidebar } from "./components/sidebar";
import { Done } from "./components/done";

import { steps, flow, initialValues, type Schema } from "./flow";

export default function App() {
  const [status, setStatus] = useState<Status<ReturnOutput<Schema>>>({
    type: "form",
    submitting: false,
  });

  const onReturn = useCallback<OnReturn<Schema>>(async (output) => {
    setStatus({ type: "form", submitting: true });

    console.log(output);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus({ type: "done", output });
  }, []);

  if (status.type === "done") {
    return (
      <Done
        output={status.output}
        onStartOver={() => setStatus({ type: "form", submitting: false })}
      />
    );
  }

  return <Form status={status} onReturn={onReturn} />;
}

interface FormProps {
  status: FormStatus;
  onReturn: OnReturn<Schema>;
}

function Form({ status, onReturn }: FormProps) {
  const form = useFormity({
    flow,
    inputs: initialValues,
    params: { status },
    history: false,
    onReturn,
  });
  return (
    <div className="@container flex h-screen w-full overflow-hidden bg-white">
      <Sidebar steps={steps} current={0} completed={0} jump={() => {}} />
      <main className="flex flex-1 flex-col overflow-hidden">{form}</main>
    </div>
  );
}
