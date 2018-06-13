<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class TaskControllerTest extends WebTestCase
{
    /**
     * Tests the endpoint returns status code is 200
     */
    public function testFetchTaskEndpointStatusCode200()
    {
        $client = static::createClient();
        $client->request("GET", "/api/tasks");

        $this->assertEquals(200, $client->getResponse()->getStatusCode());
    }

    /**
     * Tests the endpoint returns status code is 200 and task creates
     */
    public function testStoreTaskEndpointStatusCode200AndTaskCreated()
    {
        $client = static::createClient();
        $client->request(
            "POST",
            "/api/tasks",
            [],
            [],
            ["CONTENT_TYPE" => "application/json"],
            '{"description": "Goodbye, world!", "createdAt": "2012-12-21 00:00:00", "concludedAt": "2012-12-21 00:00:01", "duration": "01:45:51"}'

        );

        $obj = json_decode($client->getResponse()->getContent());

        $this->assertTrue($client->getResponse()->headers->contains("Content-Type", "application/json"));
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertEquals("Task created", $obj->message);
    }

    /**
     * Tests the endpoint returns status code is 200 and task updates
     */
    public function testUpdateTaskEndpointStatusCode200AndTaskUpdated()
    {
        $client = static::createClient();
        $client->request(
            "PUT",
            "/api/tasks/1",
            [],
            [],
            ["CONTENT_TYPE" => "application/json"],
            '{"description": "Updated!", "duration": "01:01:01"}'

        );

        $obj = json_decode($client->getResponse()->getContent());

        $this->assertTrue($client->getResponse()->headers->contains("Content-Type", "application/json"));
        $this->assertEquals(200, $client->getResponse()->getStatusCode());
        $this->assertEquals("Task updated", $obj->message);
    }

    /**
     * Tests the endpoint returns status code is 404
     */
    public function testUpdateTaskEndpointStatusCode404NonExistingTask()
    {
        $client = static::createClient();
        $client->request(
            "PUT",
            "/api/tasks/999",
            [],
            [],
            ["CONTENT_TYPE" => "application/json"],
            '{"description": "Updated!", "duration": "01:01:01"}'

        );

        $obj = json_decode($client->getResponse()->getContent());

        $this->assertTrue($client->getResponse()->headers->contains("Content-Type", "application/json"));
        $this->assertEquals(404, $client->getResponse()->getStatusCode());
        $this->assertEquals("Task not found", $obj->message);
    }
}
