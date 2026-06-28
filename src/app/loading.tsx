import { Container } from "@/components/Container";

export default function Loading() {
  return (
    <Container size="default" className="py-14">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-1/3 rounded bg-surface dark:bg-surface-dark" />
        <div className="h-4 w-2/3 rounded bg-surface dark:bg-surface-dark" />
        <div className="space-y-3 pt-4">
          <div className="h-20 rounded bg-surface dark:bg-surface-dark" />
          <div className="h-20 rounded bg-surface dark:bg-surface-dark" />
          <div className="h-20 rounded bg-surface dark:bg-surface-dark" />
        </div>
      </div>
    </Container>
  );
}
