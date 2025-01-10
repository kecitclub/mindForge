import { MapPin, Share, Copy, Ambulance, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LocationSection() {
  return (
    <div className=" p-4">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        <div className="rounded-lg border bg-background shadow-sm">
          <div className="flex items-center justify-between border-b p-4">
            <h1 className="text-xl font-semibold">Live Location Tracking</h1>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Map
            </Button>
          </div>
          <div className="flex min-h-[600px] items-center justify-center bg-muted/10">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <MapPin className="h-12 w-12" />
              <p>Map Loading...</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Your Location</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Emergency Street, City</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="h-4 w-4" />
                <span>Last updated: 2 mins ago</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Emergency Services</h2>
            <div className="mb-6 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Ambulance className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium">Ambulance #A123</p>
                  <p className="text-sm text-muted-foreground">5 mins away</p>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700"
              >
                En Route
              </Badge>
            </div>

            <div className="space-y-3">
              <Button className="w-full">
                <Share className="mr-2 h-4 w-4" />
                Share Live Location
              </Button>
              <Button variant="secondary" className="w-full">
                <Copy className="mr-2 h-4 w-4" />
                Copy Location Link
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
