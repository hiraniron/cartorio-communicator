import { CommunicationTypeForm } from "@/components/communication-types/CommunicationTypeForm";
import { PageHeader } from "@/components/communication-types/PageHeader";

const CommunicationTypes = () => {
  return (
    <div className="container mx-auto p-6">
      <PageHeader />
      <CommunicationTypeForm />
    </div>
  );
};

export default CommunicationTypes;