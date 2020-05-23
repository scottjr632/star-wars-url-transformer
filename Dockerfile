FROM node as frontend-build

WORKDIR /app
COPY client/yarn.lock client/package.json ./
RUN ls
RUN yarn
COPY client/ .
RUN yarn build


FROM golang as builder

WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build

FROM scratch

COPY --from=builder /app/interesting-url-transformer /
COPY --from=frontend-build /app/build /public

CMD [ "/interesting-url-transformer" ]