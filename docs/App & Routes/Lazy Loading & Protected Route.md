---
sidebar_position: 2
---

## lazy load functionality

In general, all the main routes of the application are imported using lazy loading and rendered within a simple Suspense component with a basic loading indicator. This approach improves the overall performance of the application, ensuring that the lazy loading process doesn't introduce unnecessary complexity or repetition in the code.

## Import Method:

```jsx title="Lazy import"
const CustomerAuthPage = withSuspense(
  lazy(() => import("../pages/Auth Pages/Customers/CustomerAuthPage"))
);
```

#### Wrap Child In Suspense component:

```jsx title="Suspense component"
const withSuspense = (Component) => {
  const WrappedComponent = (props) => (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <LoaderIcon className="size-20" />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );

  // Set a displayName for easier debugging
  WrappedComponent.displayName = `WithSuspense(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};
```

## Protected Route

To control the access level for each user type, two main indicators are used within the central state related to the user's data:

A. auth_status: The authentication status code of the user.
B. loading: The state indicating whether the user data is still being loaded.

```jsx title="Protect Route"
function ProtectedRoute() {
  // necessary data & hooks
  const { loading, userId, auth_status, error } = useSelector(
    (state) => state.userData
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [failures, setFailures] = useState(0);

  // reload page on fourth try
  useEffect(() => {
    if (failures >= 4) {
      window.location.reload();
    }

    if (error && failures < 4) {
      setFailures((prev) => prev + 1);
    }
  }, [error, loading]);

  // navigate unauthorized users to sign-in page
  useEffect(() => {
    if (!loading && auth_status === 401) {
      toast.error("You need to be logged in to access this page.");
      navigate("/EcoVibe/");
    }
  }, [loading, auth_status]);

  // dispaly error state on error case
  if (!loading && error) return <>Error State</>;

  // loading user data case
  if (!userId && loading) return <>Loading Screen</>;
  // render child component after loading
  else if ((!loading && userId) || auth_status === 200) return <Outlet />;
}
```

**Note:** The loading and error states have been omitted from the code above for better readability.
