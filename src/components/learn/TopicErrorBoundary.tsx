import { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  slug?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Specialized error boundary for Learn topic pages
 * Provides context-specific error handling and recovery options
 */
export class TopicErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const slug = this.props.slug || window.location.pathname.split("/").pop() || "unknown";
    console.error(`[TopicErrorBoundary] Error in topic: ${slug}`, {
      error,
      errorInfo,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-destructive/10 p-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Topic Failed to Load
              </h2>
              <p className="text-muted-foreground">
                This topic encountered an error while loading. This might be due to a missing
                diagram, invalid data, or a rendering issue.
              </p>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details className="text-left bg-muted/50 p-4 rounded-lg text-xs space-y-2">
                <summary className="cursor-pointer font-medium mb-2">
                  Error Details (Dev Only)
                </summary>
                <div>
                  <strong className="text-destructive">Message:</strong>
                  <pre className="overflow-auto text-destructive mt-1 text-xs">
                    {this.state.error.toString()}
                  </pre>
                </div>
                {this.state.error.stack && (
                  <div>
                    <strong className="text-destructive">Stack:</strong>
                    <pre className="overflow-auto text-xs text-muted-foreground mt-1">
                      {this.state.error.stack}
                    </pre>
                  </div>
                )}
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link to="/learn">
                <Button variant="default" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Learn
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="gap-2">
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </Link>
            </div>

            {import.meta.env.PROD && (
              <p className="text-xs text-muted-foreground pt-4">
                If this problem persists, please{" "}
                <a
                  href="mailto:contact@indumallampali.com"
                  className="text-primary hover:underline"
                >
                  report this issue
                </a>
                .
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
