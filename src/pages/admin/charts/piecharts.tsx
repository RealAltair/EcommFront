import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { Skeleton } from "../../../components/loader";
import { usePieQuery } from "../../../redux/api/dashboardAPI";
import { UserReducerInitialState } from "../../../types/reducer";

const PieCharts = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { isLoading, data, isError } = usePieQuery(user?._id!);
  const charts = data?.charts!;

  if (isError) {
    return <Navigate to={"/admin/dashboard"} />;
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
            <h1>Pie & Doughnut Charts</h1>
            <section>
              <div>
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]}
                  data={[
                    charts.orderFullfillment.processing,
                    charts.orderFullfillment.shipped,
                    charts.orderFullfillment.delivered,
                  ]}
                  backgroundColor={[
                    `hsl(110,80%, 80%)`,
                    `hsl(110,80%, 50%)`,
                    `hsl(110,40%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Order Fulfillment Ratio</h2>
            </section>
            <section>
              <div>
                <DoughnutChart
                  labels={charts.productCategories.map(
                    (i) => Object.keys(i)[0]
                  )}
                  data={charts.productCategories.map(
                    (i) => Object.values(i)[0]
                  )}
                  backgroundColor={charts.productCategories.map(
                    (i) =>
                      `hsl(${Object.values(i)[0] * Math.random() * 4}, ${
                        Object.values(i)[0] * Math.random() * 7
                      }%, 45%)`
                  )}
                  legends={false}
                  offset={[0, 0, 0, 80]}
                />
              </div>
              <h2>Product Categories Ratio</h2>
            </section>
            <section>
              <div>
                <DoughnutChart
                  labels={["In Stock", "Out Of Stock"]}
                  data={[
                    charts.stockAvailability.inStock,
                    charts.stockAvailability.outOfStock,
                  ]}
                  backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                  legends={false}
                  offset={[0, 80]}
                  cutout={"70%"}
                />
              </div>
              <h2> Stock Availability</h2>
            </section>
            <section>
              <div>
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burn",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[
                    charts.revenueDist.marketingCost,
                    charts.revenueDist.discount,
                    charts.revenueDist.burn,
                    charts.revenueDist.productionCost,
                    charts.revenueDist.netMargin,
                  ]}
                  backgroundColor={[
                    "hsl(110,80%,40%)",
                    "hsl(19,80%,40%)",
                    "hsl(69,80%,40%)",
                    "hsl(300,80%,40%)",
                    "rgb(53, 162, 255)",
                  ]}
                  legends={false}
                  offset={[20, 30, 20, 30, 80]}
                />
              </div>
              <h2>Revenue Distribution</h2>
            </section>
            <section>
              <div>
                <PieChart
                  labels={[
                    "Teenager(Below 20)",
                    "Adult (20-50)",
                    "Older (above 50)",
                  ]}
                  data={[
                    charts.userAgeGroup.teen,
                    charts.userAgeGroup.adult,
                    charts.userAgeGroup.old,
                  ]}
                  backgroundColor={[
                    `hsl(10, ${80}%, 80%)`,
                    `hsl(10, ${80}%, 50%)`,
                    `hsl(10, ${40}%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Users Age Group</h2>
            </section>
            <section>
              <div>
                <DoughnutChart
                  labels={["Admin", "Customers"]}
                  data={[
                    charts.adminCustomer.admin,
                    charts.adminCustomer.customer,
                  ]}
                  backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                  offset={[0, 50]}
                />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default PieCharts;
