<?php

namespace App\Controller;

use App\Entity\Task;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class TaskController extends Controller
{
    private $INVALID_FORMAT = 0;
    private $INVALID_LENGTH = 1;
    private $VALID = 2;

    /**
     * @Route("/api/tasks")
     * @Method("GET")
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function fetchAction()
    {
        $repository = $this->getDoctrine()->getRepository(Task::class);

        return $this->json([
            'tasks' => $repository->fetchAll()
        ]);
    }

    /**
     * Inserts a new Task into the database after completed
     *
     * @Route("/api/tasks")
     * @Method("POST")
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function storeAction(Request $request)
    {
        $data = json_decode($request->getContent());

        try {
            $entityManager = $this->getDoctrine()->getManager();

            $createdAt = \DateTime::createFromFormat("Y-m-d H:i:s", $data->createdAt);
            $concludedAt = \DateTime::createFromFormat("Y-m-d H:i:s", $data->concludedAt);

            $task = new Task();
            $task->setDescription($data->description);
            $task->setCreatedAt($createdAt);
            $task->setConcludedAt($concludedAt);
            $task->setDuration($data->duration);

            $entityManager->persist($task);
            $entityManager->flush();

            return $this->json([
                "message" => "Task created",
                "status" => 200
            ]);
        } catch (\Exception $e) {
            return $this->json([
                "error" => [
                    "code" => 500,
                    "message" => $e->getMessage(),
                    "file" => $e->getFile()
                ]
            ]);
        }
    }

    /**
     * Inserts a new Task into the database after completed
     *
     * @Route("/api/tasks/{id}")
     * @Method("PUT")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function updateAction(Request $request)
    {
        $data = json_decode($request->getContent());
        $entityManager = $this->getDoctrine()->getManager();

        $task = $entityManager->getRepository(Task::class)->find((int)$request->get("id"));

        if (!$task) {
            return $this->json([
                "message" => "Task not found",
                "status" => 404
            ], 404);
        }

        switch (self::_validateDuration($data->duration)) {
            case $this->INVALID_FORMAT:
                return $this->json([ "message" => "Duration must contain only numbers", "status" => 500 ], 500);
            case $this->INVALID_LENGTH:
                return $this->json([ "message" => "Hours, minutes, and seconds must contain 2 digits", "status" => 500 ], 500);
        }

        try {
            $task->setDuration($data->duration);
            $entityManager->persist($task);
            $entityManager->flush();

            return $this->json([
                "message" => "Task updated",
                "status" => 200
            ]);
        } catch (\Exception $e) {
            return $this->json([
                "error" => [
                    "code" => 500,
                    "message" => $e->getMessage(),
                    "file" => $e->getFile()
                ]
            ]);
        }
    }

    /**
     * Validates the entered duration to be HH:MM:SS
     *
     * @param $duration string the HH:MM:SS format string
     * @return int error code
     */
    private function _validateDuration($duration)
    {
        $h = substr($duration, 0, 2);
        $m = substr($duration, 3, 2);
        $s = substr($duration, 6, 2);

        if (strlen($h) !== 2 || strlen($m) !== 2 || strlen($s) !== 2) {
            return $this->INVALID_LENGTH;
        } else if (!is_numeric($h) || !is_numeric($m) || !is_numeric($s)) {
            return $this->INVALID_FORMAT;
        } else {
            return $this->VALID;
        }
    }
}
