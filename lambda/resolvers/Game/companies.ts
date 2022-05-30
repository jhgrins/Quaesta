import { Context } from "../index";
import { makeIGDBRequestForRouteByIds } from "../utils";

const companies = async (parent: any, args: any, context: Context, info: any) => {
    const involvedCompanies = await makeIGDBRequestForRouteByIds(
        context.twitchToken as string,
        "involved_companies",
        parent.involved_companies
    );
    const companies = await makeIGDBRequestForRouteByIds(
        context.twitchToken as string,
        "companies",
        involvedCompanies.map((company: any) => company.company)
    );
    return companies.map((company: { name: any; }) => company.name);
};

export default companies;
