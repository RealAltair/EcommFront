import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { UserReducerInitialState } from "../../../types/reducer";
import toast from "react-hot-toast";
import { CustomError } from "../../../types/api";
import { useBarQuery } from "../../../redux/api/dashboardAPI";
import { Skeleton } from "../../../components/loader";
import { getLastMonths } from "../../../utils/features";

const { last12Months, last6Months } = getLastMonths();

const Barcharts = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { isLoading, data, error, isError } = useBarQuery(user?._id!);
  const charts = data?.charts!;

  if (isError) {
    toast.error((error as CustomError).data.message);
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        {isLoading ? (
          <>
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <>
            {" "}
            <h1>Bar Charts</h1>
            <section>
              <BarChart
                data_2={charts.users || []}
                data_1={charts.products || []}
                title_1="Products"
                title_2="Users"
                labels={last6Months}
                bgColor_1={`hsl(260, 50%, 30%)`}
                bgColor_2={`hsl(360, 90%, 90%)`}
              />
              <h2>Top Products & Top Customers</h2>
            </section>
            <section>
              <BarChart
                horizontal={true}
                data_1={charts.orders || []}
                data_2={[]}
                title_1="Orders"
                title_2=""
                bgColor_1={`hsl(180, 40%, 50%)`}
                bgColor_2=""
                labels={last12Months}
              />
              <h2>Orders throughout the year</h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Barcharts;
