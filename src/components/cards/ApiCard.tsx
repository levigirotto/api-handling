import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

type ApiCardProps = {
  title: string;
  description: string;
  apiLink: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
}

export default function ApiCard({ title, description, apiLink, content, footer }: ApiCardProps) {
  return (
    <div className="w-full mx-auto break-inside-avoid">
        <Card>
          <CardHeader>
              <CardTitle>
                  <h2 className="text-2xl">{title}</h2>
              </CardTitle>
              <CardDescription>
                  <div className="flex gap-2">
                      <a className="text-neutral-500 hover:text-neutral-500 hover:text-neutral-400" href={apiLink}>{description}</a>
                  </div>
              </CardDescription>
          </CardHeader>
          <CardContent>{content}</CardContent>
          {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    </div>
  );
}
