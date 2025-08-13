import { RecentActivityService } from './recent-activity.service';
export declare class RecentActivityController {
    private readonly recentActivityService;
    constructor(recentActivityService: RecentActivityService);
    getGlobalRecentActivity(): Promise<{
        latestCompletedService: import("../services/entities/service.entity").Service;
        latestScheduledService: import("../services/entities/service.entity").Service;
        latestClient: import("../clients/entities/client.entity").Cliente;
        latestToilet: import("../chemical_toilets/entities/chemical_toilet.entity").ChemicalToilet;
        latestMaintenance: import("../toilet_maintenance/entities/toilet_maintenance.entity").ToiletMaintenance;
        latestVehicle: import("../vehicles/entities/vehicle.entity").Vehicle;
        timestamp: Date;
    }>;
}
