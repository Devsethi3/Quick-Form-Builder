import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, formatDistanceToNow } from "date-fns";
import { ElementsType, FormElementInstance } from "@/components/FormElements";
import { GetFormWithSubmissions } from "@/action/form";
import { FileText, Inbox, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

interface SubmissionsTableProps {
  id: number;
}

export default async function SubmissionsTable({ id }: SubmissionsTableProps) {
  const form = await GetFormWithSubmissions(id);

  if (!form) {
    throw new Error("Form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
      case "NumberField":
      case "TextAreaField":
      case "DateField":
      case "SelectField":
      case "CheckboxField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="flex items-center gap-2 font-medium text-foreground text-lg sm:text-xl">
            <FileText className="w-5 h-5 text-primary" />
            Submissions
            {rows.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {rows.length}
              </Badge>
            )}
          </CardTitle>
          {rows.length > 0 && (
            <p className="text-xs sm:text-sm text-muted-foreground">
              Last submission{" "}
              {formatDistanceToNow(rows[0].submittedAt, { addSuffix: true })}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0 sm:p-6 sm:pt-0">
        {rows.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {columns.map((column) => (
                    <TableHead
                      key={column.id}
                      className="text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                    >
                      {column.label}
                      {column.required && (
                        <span className="text-destructive ml-0.5">*</span>
                      )}
                    </TableHead>
                  ))}
                  <TableHead className="text-xs font-medium uppercase tracking-wider text-right whitespace-nowrap">
                    <span className="flex items-center justify-end gap-1">
                      <Clock className="w-3 h-3" />
                      Submitted
                    </span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    {columns.map((column) => (
                      <RowCell
                        key={column.id}
                        type={column.type}
                        value={row[column.id]}
                      />
                    ))}
                    <TableCell className="text-muted-foreground text-right text-sm whitespace-nowrap">
                      {formatDistanceToNow(row.submittedAt, { addSuffix: true })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  );
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value || <span className="text-muted-foreground">-</span>;

  switch (type) {
    case "DateField":
      if (!value) {
        node = <span className="text-muted-foreground">-</span>;
        break;
      }
      const date = new Date(value);
      node = (
        <Badge variant="outline" className="font-normal">
          {format(date, "MMM dd, yyyy")}
        </Badge>
      );
      break;
    case "CheckboxField":
      const checked = value === "true";
      node = (
        <div className="flex items-center">
          <Checkbox checked={checked} disabled className="cursor-default" />
        </div>
      );
      break;
  }

  return (
    <TableCell className="text-sm max-w-[200px] truncate">{node}</TableCell>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
        <Inbox className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg sm:text-xl font-medium text-foreground mb-2">
        No submissions yet
      </h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm">
        Share your form to start collecting responses. Submissions will appear
        here once people start filling out your form.
      </p>
    </div>
  );
}

export function SubmissionsTableSkeleton() {
  return (
    <Card className="border-border">
      <CardHeader className="p-4 sm:p-6">
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}